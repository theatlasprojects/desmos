import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function Updates() {
  // Sample updates data - replace with your actual updates
  const updates = [
    {
      id: 1,
      date: "March 15, 2025",
      title: "New Calculus Calculators Added",
      description: "Added 3 new calculators for Calculus I covering integration techniques.",
    },
    {
      id: 2,
      date: "March 10, 2025",
      title: "Site Launch",
      description: "Initial launch of Desmos Solutions with calculators for Calculus, Algebra, and Statistics courses.",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Changelog</CardTitle>
        <CardDescription>Recent updates to our calculator collection</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {updates.map((update) => (
            <div key={update.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">{update.title}</h3>
                <span className="text-sm text-muted-foreground">{update.date}</span>
              </div>
              <p className="text-sm text-muted-foreground">{update.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}