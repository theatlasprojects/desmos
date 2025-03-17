"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calculator, ExternalLink } from "lucide-react"

// Sample data - replace with your actual data
const calculators = [
  {
    id: 1,
    title: "Limits and Continuity",
    description: "Explore limits and continuity concepts",
    url: "https://www.desmos.com/calculator/example1",
    course: "Calculus I",
    assignment: "Assignment 1",
    tags: ["calculus", "limits", "continuity"],
  },
  {
    id: 2,
    title: "Derivatives and Applications",
    description: "Practice derivative calculations and applications",
    url: "https://www.desmos.com/calculator/example2",
    course: "Calculus I",
    assignment: "Assignment 2",
    tags: ["calculus", "derivatives"],
  },
  {
    id: 3,
    title: "Linear Equations Systems",
    description: "Solve systems of linear equations graphically",
    url: "https://www.desmos.com/calculator/example3",
    course: "Algebra II",
    assignment: "Assignment 1",
    tags: ["algebra", "linear equations"],
  },
  {
    id: 4,
    title: "Quadratic Functions",
    description: "Explore properties of quadratic functions",
    url: "https://www.desmos.com/calculator/example4",
    course: "Algebra II",
    assignment: "Assignment 2",
    tags: ["algebra", "quadratic"],
  },
  {
    id: 5,
    title: "Normal Distribution",
    description: "Visualize normal distribution properties",
    url: "https://www.desmos.com/calculator/example5",
    course: "Statistics",
    assignment: "Assignment 1",
    tags: ["statistics", "normal distribution"],
  },
  {
    id: 6,
    title: "Hypothesis Testing",
    description: "Interactive hypothesis testing visualization",
    url: "https://www.desmos.com/calculator/example6",
    course: "Statistics",
    assignment: "Assignment 2",
    tags: ["statistics", "hypothesis testing"],
  },
]

interface DesmosCalculatorsProps {
  filter: string
}

export function DesmosCalculators({ filter }: DesmosCalculatorsProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [courseFilter, setCourseFilter] = useState("all")
  const [assignmentFilter, setAssignmentFilter] = useState("all")

  // Get unique courses and assignments for filter options
  const courses = ["all", ...new Set(calculators.map((calc) => calc.course))]
  const assignments = ["all", ...new Set(calculators.map((calc) => calc.assignment))]

  // Filter calculators based on selected filters
  const filteredCalculators = calculators.filter((calculator) => {
    // Filter by tab category
    if (filter !== "all" && !calculator.tags.includes(filter)) {
      return false
    }

    // Filter by search term
    if (
      searchTerm &&
      !calculator.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !calculator.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false
    }

    // Filter by course
    if (courseFilter !== "all" && calculator.course !== courseFilter) {
      return false
    }

    // Filter by assignment
    if (assignmentFilter !== "all" && calculator.assignment !== assignmentFilter) {
      return false
    }

    return true
  })

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Input
          placeholder="Search calculators..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="md:w-1/3"
        />
        <Select value={courseFilter} onValueChange={setCourseFilter}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Filter by course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course} value={course}>
                {course === "all" ? "All Courses" : course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={assignmentFilter} onValueChange={setAssignmentFilter}>
          <SelectTrigger className="md:w-1/3">
            <SelectValue placeholder="Filter by assignment" />
          </SelectTrigger>
          <SelectContent>
            {assignments.map((assignment) => (
              <SelectItem key={assignment} value={assignment}>
                {assignment === "all" ? "All Assignments" : assignment}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredCalculators.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No calculators found matching your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map((calculator) => (
            <Card key={calculator.id} className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {calculator.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{calculator.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge variant="outline">{calculator.course}</Badge>
                  <Badge variant="outline">{calculator.assignment}</Badge>
                </div>
                <div className="flex flex-wrap gap-1">
                  {calculator.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <a
                  href={calculator.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  Open in Desmos <ExternalLink className="h-3 w-3" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}