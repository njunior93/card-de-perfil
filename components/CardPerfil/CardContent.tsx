'use client'

import { CardPerfil } from "@/components/CardPerfil/CardPerfil"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import CircularProgress from '@mui/material/CircularProgress'

export default function CardContent() {
  const searchParams = useSearchParams()

  const nome = searchParams.get('nome') || ''
  const cargo = searchParams.get('cargo') || ''
  const seguidores = searchParams.get('seguidores') || ''
  const seguindo = searchParams.get('seguindo') || ''
  const qtdProjetos = searchParams.get('qtdProjetos') || ''
  const texto = searchParams.get('texto') || ''
  const paramsFoto = searchParams.get('foto') || '/foto-ilustrativa.JPG'

  const [loading, setLoading] = useState(true)
  const [progresso, setProgresso] = useState(0)
  const [foto, setFoto] = useState<string>(paramsFoto)

  useEffect(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming

    if (navigation?.type === 'reload' || navigation?.type === 'back_forward') {
      setFoto('/foto-ilustrativa.JPG')
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setProgresso(prev => (prev >= 100 ? 100 : prev + 10))
    }, 800)

    const timeout = setTimeout(() => {
      setLoading(false)
      clearInterval(timer)
    }, 9000)

    return () => {
      clearInterval(timer)
      clearTimeout(timeout)
    }
  }, [])

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-[#9A67BD]">
        <div className="flex flex-col items-center space-y-4" role="status" aria-live="polite">
          <CircularProgress
            variant="determinate"
            size={80}
            thickness={5}
            value={progresso}
            sx={{ color: '#FFFFFF' }}
          />
          <p className="text-white font-sans text-base sm:text-lg font-semibold tracking-wide">
            Construindo o card...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center font-sans bg-[#9A67BD]">
      <CardPerfil
        nome={nome}
        cargo={cargo}
        seguidores={Number(seguidores)}
        seguindo={Number(seguindo)}
        qtdProjetos={Number(qtdProjetos)}
        texto={texto}
        foto={foto}
      />
    </div>
  )
}
