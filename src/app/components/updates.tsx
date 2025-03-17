import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";

export function Updates() {
  // Sample updates data - replace with your actual updates
  const updates = [
    {
      id: 1,
      date: 1742243220000,
      title: "Site Launch",
      description: "Initial launch of Desmos Solutions.",
    },
    {
      id: 2,
      date: 1742243220001,
      title: "ENGG 202 Assignment 9",
      description: "Added calculators for all 3 questions in Assignment 9.",
    },
    {
      id: 3,
      date: 1742254037000,
      title: "ENGG 259 Assignment 7",
      description: "Added calculators for all 8 questions in Assignment 7.",
    }
  ];

  function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', { timeZone: 'America/Edmonton', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Updates</CardTitle>
        <CardDescription>Recent updates to this site and any calculators.</CardDescription>
      </CardHeader>
      <hr className="border-t-2 border-gray-200 pb-5" />
      <CardContent>
        <div className="space-y-4">
          {updates.sort((a, b) => b.id - a.id).map((update) => (
            <div key={update.id} className="border-b pb-4 last:border-0">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-medium">{update.title}</h3>
                <span className="text-sm text-muted-foreground">{formatDate(update.date)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{update.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}