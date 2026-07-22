import Image from 'next/image';
import Link from 'next/link';
import { Exhibit } from '@/types';
import { AlertCircle } from 'lucide-react';

export default function ExhibitCard({ exhibit }: { exhibit: Exhibit }) {
  return (
    <div className="group glass-panel rounded-lg overflow-hidden flex flex-col hover:border-museum-red/50 transition duration-300">
      
      {/* Thumbnail */}
      <div className="relative h-52 w-full overflow-hidden bg-museum-dark">
        <Image
          src={exhibit.primary_image || '/placeholder-exhibit.jpg'}
          alt={exhibit.title}
          fill
          className="object-cover group-hover:scale-105 transition duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-3 right-3 bg-museum-black/80 backdrop-blur-md px-2.5 py-1 rounded text-xs font-mono text-museum-red border border-museum-red/30 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" /> Banned {exhibit.year_banned}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-xs font-mono uppercase text-museum-muted tracking-wider">
            {exhibit.gallery_name}
          </span>
          <h3 className="text-lg font-bold text-white mt-1 group-hover:text-museum-red transition">
            {exhibit.title}
          </h3>
          <p className="text-xs text-museum-muted mt-1">
            By <span className="text-gray-300">{exhibit.designer_or_creator}</span>
          </p>
          <p className="text-sm text-gray-400 mt-3 line-clamp-2">
            {exhibit.summary}
          </p>
        </div>

        <Link
          href={`/exhibits/${exhibit.slug}`}
          className="mt-5 text-xs font-semibold uppercase tracking-wider text-museum-red hover:underline self-start"
        >
          Uncensor Details &rarr;
        </Link>
      </div>

    </div>
  );
}