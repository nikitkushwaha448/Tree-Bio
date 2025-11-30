'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Search, User, Link as LinkIcon, Hash, ExternalLink, Loader2 } from 'lucide-react'
import { toast } from 'sonner'

interface SearchResult {
  type: 'user' | 'link' | 'shortlink'
  id: string
  title: string
  description: string
  url?: string
  clicks?: number
}

const SearchComponent = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) {
      toast.error('Please enter a search term')
      return
    }

    setLoading(true)
    setHasSearched(true)

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      
      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setResults(data.results || [])
      
      if (data.results.length === 0) {
        toast.info('No results found')
      } else {
        toast.success(`Found ${data.results.length} result${data.results.length === 1 ? '' : 's'}`)
      }
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Failed to search. Please try again.')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'user':
        return <User size={20} className="text-blue-600" />
      case 'link':
        return <LinkIcon size={20} className="text-green-600" />
      case 'shortlink':
        return <Hash size={20} className="text-purple-600" />
    }
  }

  const getTypeColor = (type: SearchResult['type']) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
      case 'link':
        return 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
      case 'shortlink':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <Card className='border-2'>
        <CardHeader>
          <div className='flex items-center gap-2'>
            <div className='h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center'>
              <Search size={20} className='text-white' />
            </div>
            <div>
              <CardTitle>Search Database</CardTitle>
              <CardDescription>Search your links, short links, and profile</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Search by title, URL, short code..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
              disabled={loading}
            />
            <Button 
              onClick={handleSearch}
              disabled={loading}
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 gap-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search size={18} />
                  Search
                </>
              )}
            </Button>
          </div>
          <p className='text-xs text-muted-foreground mt-2'>Press Enter to search</p>
        </CardContent>
      </Card>

      {/* Results */}
      {hasSearched && (
        <Card className='border-2'>
          <CardHeader>
            <div className='flex items-center justify-between'>
              <div>
                <CardTitle>Search Results</CardTitle>
                <CardDescription>
                  {loading ? 'Searching...' : `${results.length} result${results.length === 1 ? '' : 's'} found`}
                </CardDescription>
              </div>
              {results.length > 0 && (
                <Badge variant="secondary">{results.length}</Badge>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className='flex flex-col items-center justify-center py-12 space-y-4'>
                <Loader2 size={40} className='animate-spin text-muted-foreground' />
                <p className='text-muted-foreground'>Searching your content...</p>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-3">
                {results.map((result) => (
                  <Card key={result.id} className='hover:shadow-md transition-shadow border-2'>
                    <CardContent className='p-4'>
                      <div className='flex items-start gap-3'>
                        <div className='mt-1'>{getIcon(result.type)}</div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex items-center gap-2 mb-1 flex-wrap'>
                            <h3 className='font-semibold truncate'>{result.title}</h3>
                            <Badge variant="outline" className={`text-xs ${getTypeColor(result.type)}`}>
                              {result.type}
                            </Badge>
                            {result.clicks !== undefined && (
                              <Badge variant="secondary" className='text-xs'>
                                {result.clicks} clicks
                              </Badge>
                            )}
                          </div>
                          <p className='text-sm text-muted-foreground truncate'>{result.description}</p>
                          {result.url && (
                            <a
                              href={result.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className='inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2'
                            >
                              Open
                              <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-12 space-y-4 text-center'>
                <div className='h-16 w-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 flex items-center justify-center'>
                  <Search size={32} className='text-amber-600 dark:text-amber-400' />
                </div>
                <div className='space-y-2'>
                  <p className='font-medium text-muted-foreground'>No results found</p>
                  <p className='text-sm text-muted-foreground max-w-md'>
                    Try searching with different keywords or check your spelling
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!hasSearched && (
        <Card className='border-2 border-dashed'>
          <CardContent className='flex flex-col items-center justify-center py-12 text-center space-y-4'>
            <div className='h-16 w-16 rounded-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 flex items-center justify-center'>
              <Search size={32} className='text-amber-600 dark:text-amber-400' />
            </div>
            <div className='space-y-2'>
              <p className='font-medium text-muted-foreground'>Start searching</p>
              <p className='text-sm text-muted-foreground max-w-md'>
                Enter keywords to search across your links, short links, and profile information
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default SearchComponent
