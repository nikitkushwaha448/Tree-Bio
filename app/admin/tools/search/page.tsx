import SearchComponent from '@/modules/dashboard/components/search-component'

export default function SearchPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Search</h1>
        <p className="text-muted-foreground mt-2">Search across users, links, and short links</p>
      </div>
      <SearchComponent />
    </div>
  )
}
