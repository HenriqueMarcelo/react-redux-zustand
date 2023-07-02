import { MessageCircle } from 'lucide-react'

import { Header } from '../components/Header'
import { Video } from '../components/Video'
import { Module } from '../components/Module'
import { useEffect } from 'react'
import { useCurrentLesson, useStore } from '../zustand-store'

export function Player() {
  const { course, load } = useStore((store) => {
    return {
      course: store.course,
      load: store.load,
    }
  })

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    document.title = `Assistindo: ${currentLesson?.title}`
  }, [currentLesson])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-700">
            {course?.modules ? (
              course?.modules.map((module, index) => (
                <Module
                  title={module.title}
                  amountOfLessons={module.lessons.length}
                  moduleIndex={index}
                  key={module.id}
                />
              ))
            ) : (
              <div className="flex w-full items-center gap-3 bg-zinc-800 p-4">
                <div className="animate-pulse flex space-x-3 w-full">
                  <div className="rounded-full bg-zinc-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-3 py-1">
                    <div className="h-3 bg-zinc-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="h-3 bg-zinc-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  )
}
