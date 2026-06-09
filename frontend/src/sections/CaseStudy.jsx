import { Quote, Star } from "lucide-react";
import { useEffect, useCallback, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";

const testimonials = [
  {
    name: "Cody Nuernberg",
    title: "President",
    company: "BLD Connection",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_516099152.jpg",
    quote: "Veracity Technologies has helped streamline our company's operations. The biggest advantage of partnering with them is the confidence and peace of mind they provide in our IT infrastructure. Their proactive, responsive, and knowledgeable team minimizes downtime and ensures consistent operations.",
  },
  {
    name: "Ryan Morris",
    title: "Vice President",
    company: "Fraser Morris",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_120011449.jpg",
    quote: "The most significant benefit has been their prompt response to issues and the expertise of the technical staff, who intimately understand our systems for complex projects. Their swift action ensures minimal downtime, while intimate knowledge of our environment brings unparalleled efficiency.",
  },
  {
    name: "Lauren Holec",
    title: "Manager",
    company: "Athena Actuarial",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_562997764.jpg",
    quote: "Partnering with Veracity as our IT Managed Services Provider has been a positive experience. Their exceptional responsiveness ensures our questions and issues are addressed within hours. What sets Veracity apart is their unique blend of large-scale expertise and small-firm collaboration.",
  },
  {
    name: "Mike Schultz",
    title: "Owner",
    company: "Surface Solutions",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_376499707.jpg",
    quote: "Since partnering with Veracity Technologies, our productivity has soared thanks to their exceptional responsiveness and efficient handling of IT issues. Their quick response to tickets and expert problem-solving keeps our systems running smoothly.",
  },
  {
    name: "Kaitie Firm",
    title: "Operations & Special Project Manager",
    company: "Juut SalonSpa",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_516649850.jpg",
    quote: "Partnering with Veracity Technologies for our tech support has been a game-changer. Their expertise in areas where we lack has been invaluable. Quick response time, efficient problem-solving, and seamless understanding of technology complexities have saved us time and headaches.",
  },
  {
    name: "Dustin Benz",
    title: "President",
    company: "iSpace Environments",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_323256330.jpg",
    quote: "Working with Veracity Technologies has reshaped our IT landscape with tailored solutions prioritizing reliability and efficiency. Their services provide peace of mind and freedom, enabling seamless focus on running our business. Minimal disruptions, increased productivity, and zero IT guesswork.",
  },
  {
    name: "Matthew Pince",
    title: "Operations",
    company: "Pulse Products",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_401108036.jpg",
    quote: "Extremely satisfied with Veracity Technologies since they became our Technology support partner. The single biggest benefit has been their proactive approach, which gives us peace of mind and helps us avoid any potential downtime. Their team is highly professional and skilled.",
  },
  {
    name: "Jordan Sanford",
    title: "Vice President",
    company: "Prestige Global Meeting Source",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_887369454.jpg",
    quote: "Partnering with Veracity Technologies has transformed our organization by instilling immense confidence at all levels. Their dedicated team provides a deep understanding of our IT ecosystem. Veracity's exceptional focus on relationships and customer service sets them apart.",
  },
  {
    name: "Linda Sobkowiak",
    title: "Director of Operations",
    company: "Stubbe and Associates",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_851202914.jpg",
    quote: "Working with Veracity Technologies has been incredibly beneficial. The single biggest benefit has been their responsiveness and understanding of our employees' varying tech knowledge levels. They not only provide technical support but also evaluate and mitigate risks specific to our industry.",
  },
  {
    name: "Mark Schulte",
    title: "President",
    company: "VIA Actuarial Solutions",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_401836330.jpg",
    quote: "Veracity Technologies has greatly transformed our IT landscape, ensuring a seamless transition to remote work and modernizing our infrastructure. Their outstanding service and rapid issue resolution make them an essential partner for any business.",
  },
  {
    name: "Shelley Rice",
    title: "Operations Manager",
    company: "Foreman and Airhart",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_950680703.jpg",
    quote: "Partnering with Veracity Technologies has brought significant benefits, notably their exceptional responsiveness and knowledgeable staff, who provide a personal touch to our support requirements. Their ability to understand and cater to each client's unique working environment sets them apart.",
  },
  {
    name: "Nadine Wikstrom",
    title: "Director of Operations",
    company: "SEIU Local 284",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_916777825.jpg",
    quote: "Partnering with Veracity Technologies has changed our company, ensuring all licenses, equipment, and employee computer issues are efficiently managed. With over 12 years of partnership, Veracity's professionalism and commitment to tailored solutions have been unmatched.",
  },
  {
    name: "Aaron Lindberg",
    title: "Chief Investment Officer",
    company: "Kingdom Legacy Advisors",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_777267656.jpg",
    quote: "Since teaming up with Veracity Technologies, our biggest benefit has been their streamlined, one-stop solution for all our technology needs. Their expertise and personalized support ensure efficient operations without the hassle of managing multiple vendors.",
  },
  {
    name: "Janet Johnson",
    title: "Legal Administrator",
    company: "Gregerson, Rosow, Johnson, and Nilan",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_508762783.jpg",
    quote: "In my nearly 32 years with our firm, partnering with Veracity Technologies has been invaluable. Their deep understanding of our systems and operations ensures they provide tailored advice without upselling. Their prompt responsiveness and personalized service distinguish them.",
  },
  {
    name: "Jesse Hallstrom",
    title: "Chief Financial Officer",
    company: "Hempel Companies",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_680591936.jpg",
    quote: "Partnering with Veracity Technologies has been crucial for our operations. They swiftly solve problems, ensuring smooth business continuity. Their transparent, fair pricing and dedicated client focus set them apart from others.",
  },
  {
    name: "Gretchen Postula",
    title: "Managing Director",
    company: "North Sky Capital",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_215968298.jpg",
    quote: "The standout benefit has been their personalized approach. Unlike larger firms where we felt like just another client, Veracity understands our unique needs and challenges. Their quarterly business reviews strengthen our partnership, aligning technology with our business objectives.",
  },
  {
    name: "Ellen Qureshi",
    title: "CCO",
    company: "Black Lake Investments",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_231011304.jpg",
    quote: "I've been consistently impressed by their vigilant monitoring and expert support, providing peace of mind regarding our IT Infrastructure. Their commitment to SOC reporting underscores their strong internal controls and operational oversight.",
  },
  {
    name: "Robbin Stusse",
    title: "Operations Manager",
    company: "Edelmann and Associates",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_625887714.jpg",
    quote: "Working with Veracity Technologies as our IT partner has been exceptional. The comprehensive support for all our IT needs, from PCs to servers and network solutions, makes them feel like an extension of our own team.",
  },
  {
    name: "Karen Engen",
    title: "President",
    company: "Practice Builders",
    photo: null,
    quote: "Veracity Technologies has consistently impressed us as our Technology support partner. Their ability to swiftly resolve issues ensures minimal disruption to our operations, crucial for both our staff and patients. Their dedicated customer service sets them apart.",
  },
  {
    name: "Bob Harris",
    title: "Controller",
    company: "Salon Only Sales",
    photo: "https://transform.octanecdn.com/fitLogo/200x200/https://octanecdn.com/veracitytechcom/veracitytechcom_852921665.jpg",
    quote: "Veracity Technologies has been an invaluable partner for our tech support needs. Their commitment to integrating innovative technologies and enhancing our network security has been transformative. I trust Veracity to manage and set up our entire network.",
  },
];

export default function CaseStudy() {
  const [api, setApi] = useState(null);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      api.scrollNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <section
      id="case-study"
      data-testid="case-study-section"
      aria-label="Client testimonials and results from construction, financial services, and manufacturing firms"
      className="py-16 lg:py-24 bg-[#0f1d32]"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-base font-bold uppercase tracking-[0.15em] text-[#0077B3] mb-4 animate-fade-in-up">What Our Clients Say</p>
          <h2
            data-testid="case-study-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 animate-fade-in-up stagger-1"
            style={{ fontFamily: "Outfit, sans-serif" }}
          >
            Trusted by businesses across the Twin Cities.
          </h2>
          <p className="text-[#94a8be] text-base max-w-2xl mx-auto animate-fade-in-up stagger-2">
            Don&rsquo;t take our word for it. Here&rsquo;s what our clients have to say about partnering with Veracity Technologies.
          </p>
        </div>

        {/* 5 stars right above the cards */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
          ))}
          <span className="text-[#f59e0b] text-sm font-semibold ml-2">4.9/5</span>
        </div>

        {/* Carousel - 3 visible at a time on desktop */}
        <div className="px-10 lg:px-14">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            data-testid="testimonial-carousel"
          >
            <CarouselContent className="-ml-6">
              {testimonials.map((t, i) => (
                <CarouselItem
                  key={i}
                  className="pl-6 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <div
                    data-testid={`testimonial-card-${i}`}
                    className="grid-border-card p-6 h-full flex flex-col"
                  >
                    <Quote className="w-6 h-6 text-[#0077B3]/20 mb-4 flex-shrink-0" />
                    <p className="text-[#94a8be] text-sm leading-relaxed mb-6 flex-1 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                    <div className="border-t border-white/10 pt-4 mt-auto flex items-center gap-3">
                      {t.photo ? (
                        <img
                          src={t.photo}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/10"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-[#1e6bb8] flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                          {t.name.split(" ").map(n => n[0]).join("")}
                        </div>
                      )}
                      <div>
                        <p data-testid={`testimonial-author-${i}`} className="text-white font-semibold text-sm">
                          {t.name}
                        </p>
                        <p className="text-[#94a8be] text-xs">
                          {t.title}, {t.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              data-testid="carousel-prev"
              className="border-white/10 bg-[#0f1d32] text-white hover:bg-[#0077B3] hover:border-[#0077B3] hover:text-white -left-5 lg:-left-7"
            />
            <CarouselNext
              data-testid="carousel-next"
              className="border-white/10 bg-[#0f1d32] text-white hover:bg-[#0077B3] hover:border-[#0077B3] hover:text-white -right-5 lg:-right-7"
            />
          </Carousel>
        </div>

        {/* Stats - open divider layout */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-0 border-t border-white/10/50 pt-8">
          <div data-testid="case-study-metric-0" className="text-center px-4">
            <p className="stat-number text-5xl text-white">60+</p>
            <p className="text-xs text-[#94a8be] mt-1">Active Clients</p>
          </div>
          <div data-testid="case-study-metric-1" className="text-center px-4 border-l border-white/10/30">
            <p className="stat-number text-5xl text-white">32</p>
            <p className="text-xs text-[#94a8be] mt-1">Years Longest Partnership</p>
          </div>
          <div data-testid="case-study-metric-2" className="text-center px-4 border-l border-white/10/30">
            <p className="stat-number text-5xl text-[#0077B3]">24/7</p>
            <p className="text-xs text-[#94a8be] mt-1">Support Availability</p>
          </div>
          <div data-testid="case-study-metric-3" className="text-center px-4 border-l border-white/10/30">
            <p className="stat-number text-5xl text-white">4.9</p>
            <p className="text-xs text-[#94a8be] mt-1">Average Client Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}
