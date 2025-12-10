import { Suspense } from "react"
import CardContent from "@/components/CardPerfil/CardContent"

const PaginaCard = () => {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#9A67BD]" />}>
      <CardContent />
    </Suspense>
  )
}

export default PaginaCard;
