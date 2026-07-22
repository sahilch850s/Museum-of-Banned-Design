import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getExhibitBySlug } from '@/services/exhibit';
import { AlertTriangle, Calendar, User, ShieldX } from 'lucide-react';
import InteractiveSection from '@/components/museum/InteractiveSection';

export default async function ExhibitDetailPage({ params }: { params: { slug: string } }) {
  let exhibit = null;

  try {
    exhibit = await getExhibitBySlug(params.slug);
  } catch (err) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto space-y-10 py-6">
      
      {/* Header Info */}
      <div className="space-y-4 border-b border-museum-border pb-8">
        <div className="flex items-center gap-2 text-xs font-mono text-museum-red">
          <ShieldX className="w-4 h-4" /> {exhibit.ban_category} CENSORSHIP
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
          {exhibit.title}
        </h1>
        
        <div className="flex flex-wrap gap-6 text-sm text-museum-muted pt-2">
          <span className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-museum-red" /> Creator: <strong className="text-white">{exhibit.designer_or_creator}</strong>
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-museum-red" /> Banned In: <strong className="text-white">{exhibit.year_banned}</strong>
          </span>
        </div>
      </div>

      {/* Main Primary Image */}
      <div className="relative h-96 sm:h-[480px] w-full rounded-2xl overflow-hidden glass-panel border border-museum-border">
        <Image
          src={exhibit.primary_image}
          alt={exhibit.title}
          fill
          className="object-contain p-4"
          priority
        />
      </div>

      {/* Story Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6 text-gray-300 leading-relaxed">
          <h2 className="text-xl font-bold text-white border-l-4 border-museum-red pl-3">
            The Uncensored History
          </h2>
          <p className="whitespace-pre-line text-sm sm:text-base">
            {exhibit.full_story || exhibit.summary}
          </p>
        </div>

        {/* Sidebar Metadata */}
        <div className="space-y-6">
          <div className="glass-panel p-5 rounded-xl border border-museum-border space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-museum-red" /> Ban Classification
            </h3>
            <p className="text-xs text-museum-muted">
              {exhibit.summary}
            </p>
            <div className="pt-2 border-t border-museum-border">
              <span className="text-xs font-mono text-gray-400">Wing: {exhibit.gallery_name}</span>
            </div>
          </div>
        </div>

      </div>
      {/* Interactive Experience: Quizzes & Reflections */}
      <InteractiveSection exhibitId={exhibit.id} />
    </article>
  );
}

// File ke top par add karein:


// Aur article tag ke andar end mein add karein:
     