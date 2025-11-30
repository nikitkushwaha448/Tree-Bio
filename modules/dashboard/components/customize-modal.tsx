"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Palette, Layout, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface CustomizeModalProps {
  isOpen: boolean
  onClose: () => void
}

const themes = [
  { name: 'Default', bg: 'bg-white', accent: 'bg-green-500' },
  { name: 'Dark', bg: 'bg-gray-900', accent: 'bg-purple-500' },
  { name: 'Ocean', bg: 'bg-blue-50', accent: 'bg-blue-600' },
  { name: 'Sunset', bg: 'bg-orange-50', accent: 'bg-orange-500' },
  { name: 'Forest', bg: 'bg-green-50', accent: 'bg-green-700' },
  { name: 'Lavender', bg: 'bg-purple-50', accent: 'bg-purple-600' },
]

const buttonStyles = [
  { name: 'Rounded', class: 'rounded-full', preview: 'rounded-full' },
  { name: 'Square', class: 'rounded-none', preview: 'rounded-none' },
  { name: 'Soft', class: 'rounded-lg', preview: 'rounded-lg' },
  { name: 'Sharp', class: 'rounded-sm', preview: 'rounded-sm' },
]

export function CustomizeModal({ isOpen, onClose }: CustomizeModalProps) {
  const [selectedTheme, setSelectedTheme] = useState('Default')
  const [selectedButtonStyle, setSelectedButtonStyle] = useState('Rounded')

  const handleSave = () => {
    // TODO: Implement actual theme saving to database
    toast.success('Theme customization saved!')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Tree</DialogTitle>
          <DialogDescription>
            Personalize the look and feel of your link tree
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="theme" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="theme" className="gap-2">
              <Palette size={16} />
              Theme
            </TabsTrigger>
            <TabsTrigger value="layout" className="gap-2">
              <Layout size={16} />
              Layout
            </TabsTrigger>
            <TabsTrigger value="effects" className="gap-2">
              <Sparkles size={16} />
              Effects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="theme" className="space-y-4 mt-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Color Theme</Label>
              <div className="grid grid-cols-3 gap-3">
                {themes.map((theme) => (
                  <button
                    key={theme.name}
                    onClick={() => setSelectedTheme(theme.name)}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      selectedTheme === theme.name
                        ? 'border-primary shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full h-20 ${theme.bg} rounded-md mb-2 flex items-center justify-center`}>
                      <div className={`w-12 h-3 ${theme.accent} rounded-full`}></div>
                    </div>
                    <p className="text-xs font-medium text-center">{theme.name}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium mb-3 block">Button Style</Label>
              <div className="grid grid-cols-4 gap-2">
                {buttonStyles.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedButtonStyle(style.name)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedButtonStyle === style.name
                        ? 'border-primary bg-primary/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-full h-8 bg-gray-900 dark:bg-gray-100 ${style.preview} mb-1`}></div>
                    <p className="text-xs font-medium text-center">{style.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4 mt-4">
            <div className="text-center py-8 text-muted-foreground">
              <Layout size={48} className="mx-auto mb-3 opacity-50" />
              <p>Layout customization coming soon!</p>
              <p className="text-sm mt-1">Choose between different link arrangements</p>
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4 mt-4">
            <div className="text-center py-8 text-muted-foreground">
              <Sparkles size={48} className="mx-auto mb-3 opacity-50" />
              <p>Animation effects coming soon!</p>
              <p className="text-sm mt-1">Add hover animations and transitions</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2 justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
