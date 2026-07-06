import { KeepExploring } from '@/components/content/keep-exploring'
import { TOOL_CONTENT } from '@/lib/tool-content'

export function ToolFooter({ toolKey }: { toolKey: string }) {
  const content = TOOL_CONTENT[toolKey]
  if (!content) return null

  return (
    <>
      {content.seo.length > 0 ? (
        <section className="mt-10 border-t border-border/70 pt-8">
          <div className="space-y-4 text-base leading-8 text-foreground/78">
            {content.seo.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>
      ) : null}
      <KeepExploring links={content.related} />
    </>
  )
}
