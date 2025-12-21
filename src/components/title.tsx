interface Props {
  title: string;
  description?: string;
}
export default function Title({ title, description }: Props) {
  return (
    <div className="space-y-0">
      <h1 className="text-mtn-blue text-2xl font-bold tracking-tight uppercase">
        {title}
      </h1>
      {description && (
        <p className="text-muted-foreground max-w-prose text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function SubtitleOnly({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-0">
      <span className="text-muted-foreground max-w-prose text-lg">
        {children}
      </span>
    </div>
  );
}
