import { Star, MapPin, Phone, Mail, Instagram, Facebook, Linkedin, Youtube } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function HomePage() {
  const locations = [
    {
      name: "Fullano Praia",
      description:
        "Praia de mar tranquilo, ideal para relaxar. Águas cristalinas e areia branca fazem deste local perfeito para toda a família.",
      rating: 4.8,
      reviews: 234,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Lovina Seixas",
      description:
        "Experiência única com vista para o mar. Gastronomia local e ambiente acolhedor para momentos inesquecíveis.",
      rating: 4.9,
      reviews: 189,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Golfinho Bar",
      description:
        "Bar à beira-mar com vista espetacular. Drinks especiais e petiscos locais em ambiente descontraído.",
      rating: 4.7,
      reviews: 156,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Lovina Ponta de Campina",
      description:
        "Refúgio de paz e tranquilidade. Ideal para quem busca contato com a natureza e momentos de relaxamento.",
      rating: 4.8,
      reviews: 203,
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      name: "Rancho da Ema",
      description:
        "Experiência rural autêntica. Contato direto com a natureza e tradições locais em ambiente familiar.",
      rating: 4.6,
      reviews: 178,
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const testimonials = [
    {
      name: "José Fábio Chefe",
      location: "Fullano Praia João Pessoa",
      rating: 5,
      text: "Experiência incrível! O atendimento foi excepcional e a comida estava deliciosa. Recomendo muito!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Maria Silva",
      location: "Lovina Seixas",
      rating: 5,
      text: "Lugar maravilhoso com vista espetacular. Voltarei com certeza!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Carlos Santos",
      location: "Golfinho Bar",
      rating: 5,
      text: "Ambiente perfeito para relaxar. Drinks excelentes e atendimento nota 10!",
      avatar: "/placeholder.svg?height=50&width=50",
    },
    {
      name: "Ana Costa",
      location: "Rancho da Ema",
      rating: 5,
      text: "Experiência única! Contato com a natureza e hospitalidade incomparável.",
      avatar: "/placeholder.svg?height=50&width=50",
    },
  ]

  const galleryImages = [
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
    "/placeholder.svg?height=300&width=400",
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-blue-600">GRUPO FULLANO</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Sobre nós
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Restaurantes
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Localização
            </a>
          </nav>
          <Button className="bg-blue-600 hover:bg-blue-700">Reservar já</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Descubra o <span className="text-yellow-300">Sabor</span>, Viva a Experiência!
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Conheça os melhores restaurantes e experiências gastronômicas mais incríveis da Paraíba. Uma jornada
                culinária inesquecível te espera!
              </p>
              <Button size="lg" className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 mb-6">
                Conheça nossos Fullanos
              </Button>
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm opacity-90">Avaliado por mais de 1000 clientes</span>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=400&width=500"
                alt="Pessoas aproveitando experiências"
                width={500}
                height={400}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Location Tags */}
      <section className="bg-blue-600 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 text-white text-sm">
            <Badge variant="secondary" className="bg-white/20 text-white">
              GOLFINHO BAR
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              FULLANO PRAIA
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              LOVINA SEIXAS
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              LOVINA PONTA DE CAMPINA
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white">
              RANCHO DA EMA
            </Badge>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">VIVENCIE O MELHOR DA PARAÍBA</h2>
            <p className="text-gray-600">Descubra suas melhores experiências</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image src={location.image || "/placeholder.svg"} alt={location.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-blue-900 mb-2">{location.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{location.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{location.rating}</span>
                      <span className="text-gray-500 text-sm">({location.reviews})</span>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        Ver mais
                      </Button>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        IR
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-8">SOBRE NÓS</h2>
              <p className="text-lg mb-8 opacity-90">Conheça um pouco sobre nós!</p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Sabor Autêntico</h3>
                    <p className="opacity-90">
                      Pratos tradicionais preparados com ingredientes frescos e receitas familiares.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Respeito ao Mar e à Terra</h3>
                    <p className="opacity-90">
                      Sustentabilidade e respeito ao meio ambiente em todas as nossas operações.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Hospitalidade Paraibana</h3>
                    <p className="opacity-90">Atendimento caloroso e acolhedor que faz você se sentir em casa.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Experiências Memoráveis</h3>
                    <p className="opacity-90">
                      Momentos únicos que ficam na memória e no coração de nossos visitantes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="Sobre nós"
                width={600}
                height={500}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">NOSSAS AVALIAÇÕES</h2>
            <p className="text-gray-600">Reconhecido por +25.284 no Google</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-bold text-sm">{testimonial.name}</h4>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-3">{testimonial.text}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <MapPin className="w-3 h-3 mr-1" />
                  {testimonial.location}
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-600">Aprovado por milhares de avaliações no Google</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-blue-900 mb-4">AMBIENTE</h2>
            <p className="text-gray-600">Conheça os nossos ambientes!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-lg">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Ambiente ${index + 1}`}
                  width={400}
                  height={300}
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span>❤️ 127</span>
                    <span>💬 45</span>
                    <span>📤 23</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-2xl font-bold mb-6">GRUPO FULLANO</div>
              <p className="mb-6 opacity-90">
                Nosso Grupo Fullano tem a missão de oferecer a todos os clientes a melhor experiência gastronômica da
                Paraíba. Nossos restaurantes são locais de encontro, de celebração e de descoberta de novos sabores.
                Venha viver experiências inesquecíveis e provar pratos únicos de nossa culinária!
              </p>
              <div className="flex space-x-4">
                <Facebook className="w-6 h-6" />
                <Instagram className="w-6 h-6" />
                <Linkedin className="w-6 h-6" />
                <Youtube className="w-6 h-6" />
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6">ENDEREÇO</h3>
              <div className="space-y-4">
                <p>Avenida das Descobertas</p>
                <p>Algemas de Esperança</p>
                <p>João Pessoa - PB</p>
                <p>CEP: 58000-000</p>
              </div>

              <h3 className="text-xl font-bold mb-4 mt-8">CONTATO</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>(83) 99999-9999</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>grupofullano@gmail.com</span>
                </div>
              </div>

              <Button className="mt-6 bg-yellow-400 text-blue-900 hover:bg-yellow-300">RESERVAR JÁ</Button>
            </div>
          </div>

          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm opacity-75">
            <p>Copyright © 2024 - Grupo Fullano - Política de privacidade aplicada</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
