"use client";

import { useState } from "react";
import { Badge } from "@src/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@src/components/ui/card";
import { Input } from "@src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Calculator, ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@src/components/ui/accordion";

// Interfaces for data structures.
interface Question {
	id: string;
	title: string;
	description: string;
	url: string | null;
	tags: string[];
}

interface Assignment {
	id: string;
	title: string;
	questions: Question[];
}

interface CourseData {
	id: string;
	course: string;
	assignments: Assignment[];
}

interface FlattenedCalculator {
	id: string;
	title: string;
	description: string;
	url: string | null;
	tags: string[];
	course: string;
	assignment: string;
	assignmentId: string;
	courseId: string;
}

interface GroupedAssignment {
	title: string;
	questions: FlattenedCalculator[];
}

interface GroupedCourse {
	course: string;
	assignments: {
		[key: string]: GroupedAssignment;
	};
}

interface GroupedCalculators {
	[courseId: string]: GroupedCourse;
}

// Data for calculators.
const calculatorsData: CourseData[] = [
	{
		id: "phys-259",
		course: "PHYS 259",
		assignments: [
            {
                id: "phys-259-a7",
                title: "Assignment 7",
                questions: [
                    {
                        id: "phys-259-a7-q1",
                        title: "Question 1",
                        description: "Determine electron current from wire diameter and electron drift velocity.",
                        url: "https://www.desmos.com/calculator/oosdnw1ght",
                        tags: ["electromagnetism", "current", "electron", "drift velocity"]
                    },
                    {
                        id: "phys-259-a7-q2",
                        title: "Question 2",
                        description: "Find the electric field strength inside the wire.",
                        url: "https://www.desmos.com/calculator/jxwmz34xfp",
                        tags: ["electromagnetism", "electric field", "wire"]
                    },
                    {
                        id: "phys-259-a7-q3",
                        title: "Question 3",
                        description: "Calculate the resistance of resistors from resistivity and cross sections. This is a long question and has a lot of givens.",
                        url: "https://www.desmos.com/calculator/h4wlolgv1r",
                        tags: ["electromagnetism", "resistance", "resistor", "resistivity", "cross section"]
                    },
                    {
                        id: "phys-259-a7-q4",
                        title: "Question 4",
                        description: "Find the current of a wire cut in half. I think this question is the same for everyone, but check to make sure.",
                        url: "https://www.desmos.com/calculator/adokkc8st8",
                        tags: ["electromagnetism", "current", "wire"]
                    },
                    {
                        id: "phys-259-a7-q5",
                        title: "Question 5",
                        description: "Determine power when given parts of Ohm's law. This question is NOT the same for everyone.",
                        url: "https://www.desmos.com/calculator/sxb4tuehgd",
                        tags: ["electromagnetism", "power", "Ohm's law", "voltage", "current", "resistance"]
                    },
                    {
                        id: "phys-259-a7-q6",
                        title: "Question 6",
                        description: "Find the resistance of resistor from a capacitor discharging.",
                        url: "https://www.desmos.com/calculator/drkt2gsixt",
                        tags: ["electromagnetism", "resistance", "resistor", "capacitor", "discharging"]
                    },
                    {
                        id: "phys-259-a7-q7",
                        title: "Question 7",
                        description: "Given a circuit, determine capacitance and resistance of components given discharging information.",
                        url: "https://www.desmos.com/calculator/h0pmlt1rys",
                        tags: ["electromagnetism", "capacitance", "resistance", "capacitor", "discharging", "circuit", "battery"]
                    },
                    {
                        id: "phys-259-a7-q8",
                        title: "Question 8",
                        description: "Determine the resistance of a resistor in series with a capacitor in a heart pacemaker.",
                        url: "https://www.desmos.com/calculator/sqr7w9uewc",
                        tags: ["electromagnetism", "resistance", "resistor", "capacitor", "series", "pacemaker", "charging"]
                    }
                ]
            },
			{
				id: "phys-259-a8",
				title: "Assignment 8",
				questions: [
					{
						"id": "phys-259-a8-q1",
						"title": "Question 1",
						"description": "Use the open hand rule to determine directions.",
						"url": null,
						"tags": ["electromagnetism", "magnetic field", "open hand rule", "direction", "hand rule", "magnetism", "force"]
					},
					{
						"id": "phys-259-a8-q2",
						"title": "Question 2",
						"description": "Determine particle motion in a magnetic field. I won't be able to help with this one.",
						"url": null,
						"tags": ["electromagnetism", "magnetic field", "particle motion", "magnetism", "force", "vector", "velocity"]
					},
					{
						"id": "phys-259-a8-q3",
						"title": "Question 3",
						"description": "Find the magnetic force generated by current flowing through a wire.",
						"url": "https://www.desmos.com/calculator/28vefatncd",
						"tags": ["electromagnetism", "magnetic field", "force", "current", "wire", "magnetism"]
					},
					{
						"id": "phys-259-a8-q4",
						"title": "Question 4",
						"description": "Determine side length of a square loop of wire in a magnetic field.",
						"url": "https://www.desmos.com/calculator/vsnjmyulb1",
						"tags": ["electromagnetism", "magnetic field", "square loop", "wire", "magnetism"]
					},
					{
						"id": "phys-259-a8-q5",
						"title": "Question 5",
						"description": "Calculate path radius and match ions to their paths in a magnetic field. The Desmos works for the first part, but the second part is a bit more difficult. Only the second part is the same for everyone.",
						"url": "https://www.desmos.com/calculator/orvbyino26",
						"tags": ["electromagnetism", "magnetic field", "path radius", "ion", "magnetism"]
					},
					{
						"id": "phys-259-a8-q6",
						"title": "Question 6",
						"description": "Determine the magnitude of forces on a charged particle in a magnetic field in different planes.",
						"url": "https://www.desmos.com/calculator/h1wasviqfw",
						"tags": ["electromagnetism", "magnetic field", "force", "charged particle", "magnetism", "velocity"]
					},
					{
						"id": "phys-259-a8-q7",
						"title": "Question 7",
						"description": "Find the magnetic field strength required to hold up a levitating train.",
						"url": "https://www.desmos.com/calculator/92dnxcy3cl",
						"tags": ["electromagnetism", "magnetic field", "levitating train", "magnetism"]
					},
					{
						"id": "phys-259-a8-q8",
						"title": "Question 8",
						"description": "Determine the mass of a particle in a mass spectrometer.",
						"url": "https://www.desmos.com/calculator/cr757kk2jl",
						"tags": ["electromagnetism", "mass spectrometer", "mass", "particle", "magnetism"]
					}
				],
			},
			{
				id: "phys-259-a9",
				title: "Assignment 9",
				questions: [
					{
						"id": "phys-259-a9-q1",
						"title": "Question 1",
						"description": "No description available.",
						"url": "https://www.desmos.com/calculator/vcplanselz",
						"tags": ["electromagnetism"]
					},
					{
						"id": "phys-259-a9-q2",
						"title": "Question 2",
						"description": "No Desmos needed. This is a theory question. The answer is d^-1. Please try to do this yourself, remember to set up proportionalities.",
						"url": null,
						"tags": ["electromagnetism"]
					},
					{
						"id": "phys-259-a9-q3",
						"title": "Question 3",
						"description": "No description available.",
						"url": "https://www.desmos.com/calculator/ucrlrlybrw",
						"tags": ["electromagnetism"]
					},
					{
						"id": "phys-259-a9-q4",
						"title": "Question 4",
						"description": "No description available.",
						"url": "https://www.desmos.com/calculator/blevfp9grt",
						"tags": ["electromagnetism"]
					},
					{
						"id": "phys-259-a9-q5",
						"title": "Question 5",
						"description": "No description available.",
						"url": "https://www.desmos.com/calculator/l7cwx4u8ce",
						"tags": ["electromagnetism"]
					},
					{
						"id": "phys-259-a9-q6",
						"title": "Question 6",
						"description": "No description available.",
						"url": "https://www.desmos.com/calculator/wbqva3bwc7",
						"tags": ["electromagnetism"]
					},
					{
						"id": "phys-259-a9-q7",
						"title": "Question 7",
						"description": "No description available.",
						"url": "https://www.desmos.com/calculator/dpfzbmdhrw",
						"tags": ["electromagnetism"]
					},
					{
						"id": "phys-259-a9-q8",
						"title": "Question 8",
						"description": "No description available.",
						"url": "https://www.desmos.com/calculator/z3aihyggww",
						"tags": ["electromagnetism"]
					}
				],
			}
		],
	},
	{
        id: "engg-202",
		course: "ENGG 202",
		assignments: [
			{
				id: "engg-202-a9",
				title: "Assignment 9: Internal Forces and Moments (2D)",
				questions: [
					{
						id: "engg-202-a9-q1",
						title: "Question 1",
						description: "Determine the internal shear force at a given point on a beam.",
						url: "https://www.desmos.com/calculator/qygsiieyjc",
						tags: ["statics", "internal forces", "beam", "shear force"],
					},
					{
						id: "engg-202-a9-q2",
						title: "Question 2",
						description: "Determine the internal bending moment at a given point on a beam and loading system.",
						url: "https://www.desmos.com/calculator/i0gtt1iffv",
						tags: ["statics", "internal forces", "beam", "bending moment", "distributed load"],
					},
					{
						id: "engg-202-a9-q3",
						title: "Question 3",
						description: "Determine the internal bending moment at a given point on a beam and loading system.",
						url: "https://www.desmos.com/calculator/xmnoaz08y8",
						tags: ["statics", "internal forces", "beam", "bending moment", "distributed load"],
					},
				],
			}
		],
	},
];

// Flatten data for easier filtering.
const flattenData = (): FlattenedCalculator[] => {
	const flattened: FlattenedCalculator[] = [];

	calculatorsData.forEach((courseData) => {
		courseData.assignments.forEach((assignment) => {
			assignment.questions.forEach((question) => {
				flattened.push({
					id: question.id,
					title: question.title,
					description: question.description,
					url: question.url,
					tags: question.tags,
					course: courseData.course,
					assignment: assignment.title,
					assignmentId: assignment.id,
					courseId: courseData.id,
				});
			});
		});
	});

	return flattened;
};

// Get all calculators.
const allCalculators = flattenData();

interface DesmosCalculatorsProps {
	filter: string;
}

// Component for Desmos calculators.
export function DesmosCalculators({ filter }: DesmosCalculatorsProps) {
	const [searchTerm, setSearchTerm] = useState("");
	const [courseFilter, setCourseFilter] = useState("all");
	const [assignmentFilter, setAssignmentFilter] = useState("all");

	// Get unique courses and assignments for filter options.
	const courses = ["all", ...new Set(allCalculators.map((calc) => calc.course))];

	// Filter calculators based on selected filters.
	const filteredCalculators = allCalculators.filter((calculator) => {
		// Filter by tab category.
		if (filter !== "all" && !calculator.tags.includes(filter)) {
			return false;
		}

		// Filter by search term.
		if (
			searchTerm &&
			!calculator.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
			!calculator.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
			!calculator.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())) &&
			!calculator.course.toLowerCase().includes(searchTerm.toLowerCase())
		) {
			return false;
		}

		// Filter by course.
		if (courseFilter !== "all" && calculator.course !== courseFilter) {
			return false;
		}

		// Filter by assignment.
		if (assignmentFilter !== "all" && calculator.assignment !== assignmentFilter) {
			return false;
		}

		return true;
	});

	// Group filtered calculators by course and assignment.
	const groupCalculators = (): GroupedCalculators => {
		const grouped: GroupedCalculators = {};

		filteredCalculators.forEach((calculator) => {
			if (!grouped[calculator.courseId]) {
				grouped[calculator.courseId] = {
					course: calculator.course,
					assignments: {},
				};
			}

			if (!grouped[calculator.courseId].assignments[calculator.assignmentId]) {
				grouped[calculator.courseId].assignments[calculator.assignmentId] = {
					title: calculator.assignment,
					questions: [],
				};
			}

			grouped[calculator.courseId].assignments[calculator.assignmentId].questions.push(calculator);
		});

		return grouped;
	};

	const groupedCalculators = groupCalculators();

	// Handle course filter change.
	const handleCourseChange = (value: string) => {
		setCourseFilter(value);
		setAssignmentFilter("all"); // Reset assignment filter when course changes.
	};

	return (
		<div>
			<div className="flex flex-col md:flex-row gap-4 mb-6">
				<Input
					placeholder="Search calculators..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="md:w-2/3"
				/>
				<Select value={courseFilter} onValueChange={handleCourseChange}>
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
			</div>

			{filteredCalculators.length === 0 ? (
				<div className="text-center py-12">
					<p className="text-muted-foreground">No calculators found matching your filters.</p>
				</div>
			) : (
				<div className="space-y-8">
					{Object.keys(groupedCalculators).map((courseId) => {
						const courseData = groupedCalculators[courseId];
						return (
							<div key={courseId} className="border rounded-lg p-4">
								<h2 className="text-xl font-semibold mb-4">{courseData.course}</h2>
								<Accordion type="multiple" className="space-y-4">
									{Object.keys(courseData.assignments).map((assignmentId) => {
										const assignmentData = courseData.assignments[assignmentId];
										return (
											<AccordionItem
												key={assignmentId}
												value={assignmentId}
												className="border rounded-md overflow-hidden"
											>
												<AccordionTrigger className="px-4 py-2 hover:bg-muted/50">
													<span className="text-left font-medium">{assignmentData.title}</span>
												</AccordionTrigger>
												<AccordionContent className="px-4 pt-2 pb-4">
													<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
														{assignmentData.questions.map((question) => (
															<Card key={question.id} className="h-full">
																<CardHeader className="pb-2">
																	<CardTitle className="text-lg flex items-center gap-2">
																		<Calculator className="h-5 w-5 text-primary" />
																		{question.title}
																	</CardTitle>
																</CardHeader>
																<CardContent>
																	<p className="text-muted-foreground mb-4">{question.description}</p>
																	<div className="flex flex-wrap gap-1 mb-2">
																		{question.tags.map((tag) => (
																			<Badge key={tag} variant="secondary" className="text-xs">
																				{tag}
																			</Badge>
																		))}
																	</div>
																</CardContent>
																<CardFooter>
																	{question.url && (
																		<a
																			href={question.url}
																			target="_blank"
																			rel="noopener noreferrer"
																			className="flex items-center gap-1 text-primary hover:underline"
																		>
																			Open in Desmos <ExternalLink className="h-3 w-3" />
																		</a>
																	) || (
																		<span className="text-muted-foreground">No Desmos link available.</span>
																	)}
																</CardFooter>
															</Card>
														))}
													</div>
												</AccordionContent>
											</AccordionItem>
										);
									})}
								</Accordion>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
