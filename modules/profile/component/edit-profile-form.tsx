'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Upload, Save, X } from 'lucide-react'
import { toast } from 'sonner'

const EditProfileForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const [profile, setProfile] = useState({
    firstName: 'Nikit',
    lastName: 'kushwaha',
    username: 'nikitk',
    email: 'nikit@example.com',
    bio: 'Building amazing digital products',
    location: 'India',
    website: 'https://example.com',
    phone: '+91 9876543210',
  })

  const handleInputChange = (field: string, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
        toast.success('Image selected for upload')
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setPreviewImage(null)
    toast.info('Image removed')
  }

  const saveProfile = async () => {
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      toast.error('First and last name are required')
      return
    }

    if (!profile.bio.trim()) {
      toast.error('Bio is required')
      return
    }

    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Profile updated successfully!')
    } catch (error) {
      toast.error('Failed to update profile')
    } finally {
      setIsLoading(false)
    }
  }

  const initials = `${profile.firstName[0]}${profile.lastName[0]}`.toUpperCase()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Profile Picture Section */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload a new profile picture</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <Avatar className="w-32 h-32">
              <AvatarImage src={previewImage || '/default-avatar.png'} alt={profile.firstName} />
              <AvatarFallback className="text-2xl bg-[#41B313] text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUpload" className="cursor-pointer">
              <div className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition">
                <Upload size={20} />
                <span className="text-sm">Choose Image</span>
              </div>
            </Label>
            <input
              id="imageUpload"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              aria-label="Upload profile image"
              title="Upload profile image"
            />
          </div>

          {previewImage && (
            <Button
              onClick={removeImage}
              variant="outline"
              size="sm"
              className="w-full gap-2 text-red-600 hover:text-red-700"
            >
              <X size={16} />
              Remove Image
            </Button>
          )}

          <p className="text-xs text-muted-foreground text-center">
            Recommended size: 400x400px
            <br />
            Max size: 5MB
          </p>
        </CardContent>
      </Card>

      {/* Profile Form Section */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={profile.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="Enter first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={profile.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Enter last name"
              />
            </div>
          </div>

          {/* Username & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" value={profile.username} disabled className="bg-gray-50 dark:bg-gray-900" />
              <p className="text-xs text-muted-foreground">Username cannot be changed</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={profile.email} disabled className="bg-gray-50 dark:bg-gray-900" />
              <p className="text-xs text-muted-foreground">Email cannot be changed</p>
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">Bio *</Label>
            <Textarea
              id="bio"
              value={profile.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell others about yourself"
              maxLength={500}
              rows={5}
            />
            <p className="text-xs text-muted-foreground">{profile.bio.length}/500 characters</p>
          </div>

          {/* Location & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profile.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="City, Country"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={profile.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={profile.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          {/* Save Button */}
          <div className="flex gap-2 pt-4">
            <Button
              onClick={saveProfile}
              disabled={isLoading}
              className="gap-2 bg-[#41B313] hover:bg-[#369611]"
            >
              <Save size={18} />
              {isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button variant="outline">Cancel</Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>How your profile will appear to others</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-6 items-start">
            <Avatar className="w-20 h-20">
              <AvatarImage src={previewImage || '/default-avatar.png'} alt={profile.firstName} />
              <AvatarFallback className="bg-[#41B313] text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">
                {profile.firstName} {profile.lastName}
              </h2>
              <p className="text-muted-foreground">@{profile.username}</p>
              <p className="text-sm text-muted-foreground mt-2">{profile.location}</p>
              <p className="mt-3 text-sm">{profile.bio}</p>
              <div className="flex gap-4 mt-4 text-sm">
                {profile.website && (
                  <a href={profile.website} className="text-[#41B313] hover:underline" target="_blank" rel="noopener noreferrer" aria-label={`Open website ${profile.website}`} title={`Open website ${profile.website}`}>
                    {profile.website}
                  </a>
                )}
                {profile.phone && (
                  <a href={`tel:${profile.phone}`} className="text-[#41B313] hover:underline" aria-label={`Call ${profile.phone}`} title={`Call ${profile.phone}`}>
                    {profile.phone}
                  </a>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditProfileForm
