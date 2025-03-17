import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DesmosCalculators } from "./components/desmos-calculators"
import { Updates } from "./components/updates"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Desmos Solutions</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Updates</h2>
        <Updates />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="calculus">Calculus</TabsTrigger>
            <TabsTrigger value="algebra">Algebra</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <DesmosCalculators filter="all" />
        </TabsContent>
        <TabsContent value="calculus">
          <DesmosCalculators filter="calculus" />
        </TabsContent>
        <TabsContent value="algebra">
          <DesmosCalculators filter="algebra" />
        </TabsContent>
        <TabsContent value="statistics">
          <DesmosCalculators filter="statistics" />
        </TabsContent>
      </Tabs>
    </div>
  )
}