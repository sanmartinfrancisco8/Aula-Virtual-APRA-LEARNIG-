import { Folder, FileText, Download, UploadCloud, Loader2, FileAudio, FileImage, FileVideo, File } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "../store/auth";

export function Files() {
  const [folders, setFolders] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();
  const isStudent = user?.role === 'STUDENT';

  useEffect(() => {
    Promise.all([
      fetch('/api/folders').then(res => res.json()),
      fetch('/api/files').then(res => res.json())
    ])
    .then(([foldersData, filesData]) => {
      setFolders(foldersData);
      setFiles(filesData);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            {isStudent ? 'Mis Documentos' : 'Recursos y Archivos'}
            <div className="h-px flex-1 bg-gradient-to-r from-blue-400/50 to-emerald-400/50 ml-4 opacity-50" />
          </h1>
          <p className="text-gray-300 text-sm mt-1">
            {isStudent ? 'Materiales y recursos compartidos por tus profesores' : 'Repositorio centralizado de materiales e imágenes'}
          </p>
        </div>
        {!isStudent && (
          <button className="px-5 py-2.5 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.4)] border border-blue-500 focus:ring-2 focus:ring-blue-500/50 flex items-center gap-2">
            <UploadCloud size={18} /> Subir Archivo
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-1 md:col-span-4 py-8 text-center text-gray-500">
            <Loader2 className="animate-spin mx-auto mb-2 text-blue-500" size={24} />
            Cargando carpetas...
          </div>
        ) : (
          folders.map(folder => (
            <FolderCard key={folder.id} name={folder.name} items={(folder._count?.files || 0) + (folder._count?.children || 0)} />
          ))
        )}
      </div>

      <div className="bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-2xl relative overflow-hidden">
        <h2 className="text-lg font-semibold text-white mb-6">Archivos Recientes</h2>
        <div className="space-y-3">
          {loading ? (
            <div className="py-8 text-center text-gray-500">
              <Loader2 className="animate-spin mx-auto mb-2 text-blue-500" size={24} />
              Cargando archivos...
            </div>
          ) : files.length === 0 ? (
             <div className="py-8 text-center text-gray-500">No hay archivos recientes.</div>
          ) : (
            files.map(file => (
              <FileRow 
                key={file.id} 
                name={file.name} 
                size={formatSize(Number(file.sizeBytes))} 
                date={formatDate(file.createdAt)} 
                mimeType={file.mimeType}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FolderCard({ name, items }: { name: string, items: number, key?: string | number }) {
  return (
    <div className="bg-black/20 border border-white/5 hover:border-blue-500/30 hover:bg-black/40 transition-all rounded-xl p-5 group cursor-pointer flex flex-col items-center text-center">
      <Folder size={40} className="text-blue-500/70 group-hover:text-blue-400 transition-colors mb-4" fill="currentColor" strokeWidth={1} />
      <h3 className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors">{name}</h3>
      <p className="text-xs text-gray-500 mt-1">{items} items</p>
    </div>
  );
}

function FileRow({ name, size, date, mimeType }: any) {
  const getIcon = () => {
    if (mimeType?.includes('pdf')) return <FileText size={20} className="text-red-400" />;
    if (mimeType?.includes('image')) return <FileImage size={20} className="text-emerald-400" />;
    if (mimeType?.includes('video')) return <FileVideo size={20} className="text-purple-400" />;
    if (mimeType?.includes('audio')) return <FileAudio size={20} className="text-yellow-400" />;
    if (mimeType?.includes('presentation')) return <FileText size={20} className="text-orange-400" />;
    return <File size={20} className="text-blue-400" />;
  };

  return (
    <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:border-emerald-500/30 transition-all group cursor-pointer">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:border-white/20 transition-colors">
          {getIcon()}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-200 group-hover:text-white">{name}</p>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>{size}</span>
            <span>•</span>
            <span>Subido {date}</span>
          </div>
        </div>
      </div>
      <button className="p-2 text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded transition-colors">
        <Download size={16} />
      </button>
    </div>
  );
}
