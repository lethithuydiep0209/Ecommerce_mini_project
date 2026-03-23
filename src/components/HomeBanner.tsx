import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'

const banners = [
  {
    image: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1600',
    title: 'Mega Sale - Best Prices Every Day',
    subtitle: 'Shop trending products with better deals every hour.',
  },
  {
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1600',
    title: 'Flash Deals up to 50%',
    subtitle: 'Grab top tech and fashion products before they are gone.',
  },
  {
    image: 'https://images.unsplash.com/photo-1556742049-908d1f2f2b8e?w=1600',
    title: 'Easy Shopping from Home',
    subtitle: 'Discover thousands of quality products for every need.',
  },
]

export default function HomeBanner() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageFailed, setImageFailed] = useState(false)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % banners.length)
    }, 3200)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    banners.forEach((banner) => {
      const img = new Image()
      img.src = banner.image
    })
  }, [])

  useEffect(() => {
    setImageFailed(false)
  }, [activeIndex])

  return (
    <section className="relative mb-6 min-h-64 overflow-hidden rounded-2xl md:min-h-80">
      <div className="absolute inset-0">
        {!imageFailed ? (
          <img
            key={banners[activeIndex].image}
            src={banners[activeIndex].image}
            alt={banners[activeIndex].title}
            onError={() => setImageFailed(true)}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-r from-orange-500 to-orange-300" />
        )}
        <div className="absolute inset-0 bg-black/35" />
      </div>
      <div className="relative z-10 px-6 py-14 text-white md:px-10">
        <h1 className="max-w-2xl text-2xl font-bold md:text-4xl">{banners[activeIndex].title}</h1>
        <p className="mt-3 max-w-xl text-sm text-gray-100 md:text-base">
          {banners[activeIndex].subtitle}
        </p>
        <Link to="/products" className="mt-5 inline-block">
          <Button className="bg-[#ee4d2d] hover:bg-orange-700">Shop Now</Button>
        </Link>
      </div>
    </section>
  )
}
