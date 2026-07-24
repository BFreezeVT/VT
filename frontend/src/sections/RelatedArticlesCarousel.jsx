import { Link } from "react-router-dom";
import { Clock, Tag } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "../components/ui/carousel";

export default function RelatedArticlesCarousel({ currentSlug, category, allPosts }) {
  const sameCategory = allPosts.filter((p) => p.slug !== currentSlug && p.category === category);
  const otherCategory = allPosts.filter((p) => p.slug !== currentSlug && p.category !== category);
  const related = [...sameCategory, ...otherCategory].slice(0, 8);

  if (related.length === 0) return null;

  return (
    <div data-testid="blog-related-articles" className="mt-16 border-t border-white/10 pt-12">
      <h3 className="text-white font-bold text-lg mb-6" style={{ fontFamily: "Outfit" }}>
        More on {category}
      </h3>
      <Carousel opts={{ align: "start", loop: false }} className="w-full">
        <CarouselContent>
          {related.map((rp) => (
            <CarouselItem key={rp.slug} className="basis-full sm:basis-1/2 lg:basis-1/3">
              <Link
                to={`/resources/${rp.slug}`}
                data-testid={`related-article-${rp.slug}`}
                className="group block h-full grid-border-card p-5"
              >
                <span className="text-[10px] uppercase tracking-wider text-[#0077B3] border border-[#0077B3]/30 inline-flex items-center gap-1 px-2 py-0.5 mb-3">
                  <Tag className="w-2.5 h-2.5" /> {rp.category}
                </span>
                <p className="text-white text-sm font-semibold group-hover:text-[#0077B3] transition-colors leading-snug mb-3 line-clamp-3">
                  {rp.title}
                </p>
                <p className="text-[#94a8be]/60 text-xs flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {rp.read_time}
                </p>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          data-testid="related-articles-prev"
          className="hidden sm:flex -left-4 lg:-left-10 bg-[#0f1d32] border-white/10 text-white hover:bg-[#0077B3] hover:border-[#0077B3] hover:text-white"
        />
        <CarouselNext
          data-testid="related-articles-next"
          className="hidden sm:flex -right-4 lg:-right-10 bg-[#0f1d32] border-white/10 text-white hover:bg-[#0077B3] hover:border-[#0077B3] hover:text-white"
        />
      </Carousel>
    </div>
  );
}
