import Link from "next/link"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-10 w-10">
        <div className="absolute top-0 left-0 h-10 w-3 bg-fsw-green rounded-l-md transform -skew-x-12"></div>
        <div className="absolute top-0 left-2 h-10 w-3 bg-fsw-yellow transform -skew-x-12"></div>
        <div className="absolute top-0 left-4 h-10 w-3 bg-fsw-blue rounded-r-md transform -skew-x-12"></div>
      </div>
      <span className="font-bold text-xl text-fsw-blue">Food Pandora</span>
    </Link>
  )
}
