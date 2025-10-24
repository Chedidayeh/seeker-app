import React from 'react'

export default function loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="relative mx-auto mb-6 h-16 w-16">
            <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
            <div className="absolute inset-2 animate-pulse rounded-full bg-primary/10"></div>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">
            Loading...
          </h3>
          <p className="text-sm text-muted-foreground">Please wait a moment</p>
        </div>
      </div>
  )
}
