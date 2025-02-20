import Image from "next/image";

export default async function AboutPage() {
  // TODO:
  // Refine styling
  // Hook up images

  return (
    <main className="bg-neutral-100 text-neutral-800 my-20 md:my-44 px-4">
      <div className="mx-auto">
        <h1 className="tracking-tighter font-extrabold text-[3rem] sm:text-[4rem] mb-5">
          Our Story
        </h1>

        <div className="space-y-16">
          {/* Vision Section */}
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-medium">Artistry & Excellence</h2>
              <p className="text-neutral-600 leading-relaxed">
                At DYMONÉ, we believe in the transformative power of exceptional
                jewelry. Each piece we create is a testament to our dedication
                to artistry, craftsmanship, and the pursuit of excellence.
              </p>
            </div>
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/images/about/artistry.jpg"
                alt="Jewelry crafting process"
                fill
                className="object-cover"
                priority
              />
            </div>
          </section>

          {/* Craftsmanship Section */}
          <section className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-xl overflow-hidden md:order-2">
              <Image
                src="/images/about/craftsmanship.jpg"
                alt="Detailed jewelry work"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-4 md:order-1">
              <h2 className="text-2xl font-medium">Master Craftsmanship</h2>
              <p className="text-neutral-600 leading-relaxed">
                Our master artisans bring decades of experience to each
                creation, combining traditional techniques with contemporary
                design. Every stone is carefully selected, every setting
                precisely crafted, ensuring each piece meets our exacting
                standards.
              </p>
            </div>
          </section>

          {/* Values Section */}
          <section className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Sustainability</h3>
              <p className="text-neutral-600">
                We are committed to responsible sourcing and sustainable
                practices, ensuring our creations respect both artistry and
                environment.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Innovation</h3>
              <p className="text-neutral-600">
                While honoring traditional craftsmanship, we embrace modern
                techniques to create pieces that are both timeless and
                contemporary.
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-medium">Excellence</h3>
              <p className="text-neutral-600">
                Every piece that bears the DYMONÉ name represents our unwavering
                commitment to excellence and artistic integrity.
              </p>
            </div>
          </section>

          {/* Collection Preview */}
          <section className="text-center space-y-8">
            <h2 className="text-2xl font-medium">Discover Our Collections</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative h-[200px] rounded-xl overflow-hidden">
                <Image
                  src="/images/about/collection-1.jpg"
                  alt="Signature collection"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[200px] rounded-xl overflow-hidden">
                <Image
                  src="/images/about/collection-2.jpg"
                  alt="Modern classics"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[200px] rounded-xl overflow-hidden">
                <Image
                  src="/images/about/collection-3.jpg"
                  alt="Limited editions"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-[200px] rounded-xl overflow-hidden">
                <Image
                  src="/images/about/collection-4.jpg"
                  alt="Bespoke pieces"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
