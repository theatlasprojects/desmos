import { DesmosCalculators } from "@app/components/desmos-calculators"
import { Updates } from "@app/components/updates"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@src/components/ui/dialog"
import { Button } from "@src/components/ui/button"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Dialog>
        <div className="flex justify-center">
          <h1 className="text-4xl font-bold text-center mb-8 pr-5">Desmos Solutions</h1>
          <DialogTrigger asChild>
            <Button style={{ borderRadius: '50%' }}>?</Button>
          </DialogTrigger>
        </div>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>How do I use this?</DialogTitle>
            <DialogDescription>
              <strong>Step 1. </strong> Find the course and assignment you need help with.<br />
              <strong>Step 2. </strong> Click on the calculator to open it.<br />
              <strong>Step 3. </strong> Under the &quot;VARIABLES&quot; category, enter the values you have. Pay close attention to units.<br />
              <strong>Step 4. </strong> Don&apos;t touch anything else. Your values will be calculated and displayed in the middle of the screen.<br />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>


      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Updates</h2>
        <Updates />
      </div>

      <hr className="border-t-2 border-gray-200 flex-grow pb-6" />
      <h2 className="text-2xl font-bold mb-4">Calculators</h2>

      <DesmosCalculators filter="all" />

      <footer className="text-center text-muted-foreground mt-8">
        <p><strong>DISCLAIMER:</strong> This site is meant for users to double check their work and learn from the calculators.</p>
        <p>This is not intended to be used for any academic misconduct, but rather as a learning tool.</p>
        <br />
        <p>Found something wrong or need any help?</p>
        <p>Email me at <a href="mailto:help@atlasproject.ca" className="text-blue-600">desmos@atlasproject.ca</a>.</p>
      </footer>
    </div>
  );
}