'use client'

import { useEffect, useState } from 'react'
import { generatePortrait, generatePortraitFromImage, type PortraitEffect } from '../lib/portrait'

export default function Portrait({
  name,
  effect = 'duotone',
  image,
}: {
  name: string
  effect?: PortraitEffect
  image?: string
}) {
  const [src, setSrc] = useState('')

  useEffect(() => {
    let active = true
    if (image) {
      generatePortraitFromImage(name, image, effect)
        .then(url => { if (active) setSrc(url) })
        .catch(() => { if (active) setSrc(generatePortrait(name, effect)) })
    } else {
      setSrc(generatePortrait(name, effect))
    }
    return () => { active = false }
  }, [name, effect, image])

  // Real photo: show the stylized effect, and reveal the untouched photo on hover.
  if (image) {
    return (
      <span className="group/face relative block h-full w-full">
        {src && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute inset-0 block h-full w-full object-cover opacity-100 transition-opacity duration-500 group-hover/face:opacity-0"
            src={src}
            alt={name}
          />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="absolute inset-0 block h-full w-full object-cover opacity-0 transition-opacity duration-500 group-hover/face:opacity-100"
          src={image}
          alt={name}
        />
      </span>
    )
  }

  if (!src) return null

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      className="block h-full w-full object-cover"
    />
  )
}
