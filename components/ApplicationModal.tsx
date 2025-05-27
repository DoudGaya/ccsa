"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import { programApplicationSchema } from "@/lib/schemas"
import { programApplicationSchema } from "@/lib/schema"
import { createProgramApplication } from "@/actions/program-application"
import { toast } from "sonner"

type FormData = z.infer<typeof programApplicationSchema>

interface ApplicationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showCosmopolitanFields, setShowCosmopolitanFields] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(programApplicationSchema),
  })

  const highestQualificationOptions = [
    { value: "Secondary School", label: "Secondary School Certificate" },
    { value: "undergraduate", label: "Undergraduate Degree" },
    { value: "postgraduate", label: "Postgraduate Degree" },
    { value: "phd", label: "PhD" },
  ]


  const undergradCourses = [
  { id: "accounting", name: "Accounting", level: "undergraduate" },
  { id: "business_admin", name: "Business Administration", level: "undergraduate" },
  { id: "computer_engineering", name: "Computer Engineering", level: "undergraduate" },
  { id: "computer_science", name: "Computer Science", level: "undergraduate" },
  { id: "criminology", name: "Criminology and Security Studies", level: "undergraduate" },
  { id: "cyber_security", name: "Cyber Security", level: "undergraduate" },
  { id: "economics", name: "Economics", level: "undergraduate" },
  { id: "electrical_engineering", name: "Electrical and Electronics Engineering", level: "undergraduate" },
  { id: "entrepreneurship", name: "Entrepreneurship", level: "undergraduate" },
  { id: "health_info_management", name: "Health Information Management", level: "undergraduate" },
  { id: "information_system", name: "Information System", level: "undergraduate" },
  { id: "international_relations", name: "International Relations", level: "undergraduate" },
  { id: "nursing_sciences", name: "Nursing Sciences", level: "undergraduate" },
  { id: "public_health", name: "Public Health", level: "undergraduate" },
  { id: "software_engineering", name: "Software Engineering", level: "undergraduate" },
  { id: "telecommunications", name: "Telecommunications Engineering", level: "undergraduate" },
];

  const isCosmopolitanStudent = watch("isCosmopolitanStudent")

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    try {
      const result = await createProgramApplication(data)

      if (result.success) {
        toast("Success!", {
          description: "Your application has been submitted successfully.",
        })
        reset()
        onClose()
      } else {
        toast("Error", {
          description: result.error || "Failed to submit application.",
        })
      }
    } catch (error) {
      toast("Error", {
        description: "An unexpected error occurred.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Program Application</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input id="firstName" {...register("firstName")} className={errors.firstName ? "border-red-500" : ""} />
                {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
              </div>

              <div>
                <Label htmlFor="middleName">Middle Name</Label>
                <Input id="middleName" {...register("middleName")} />
              </div>

              <div>
                <Label htmlFor="surname">Surname *</Label>
                <Input id="surname" {...register("surname")} className={errors.surname ? "border-red-500" : ""} />
                {errors.surname && <p className="text-red-500 text-sm mt-1">{errors.surname.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("dateOfBirth")}
                  className={errors.dateOfBirth ? "border-red-500" : ""}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className={errors.email ? "border-red-500" : ""}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  {...register("phoneNumber")}
                  className={errors.phoneNumber ? "border-red-500" : ""}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>}
              </div>

              <div>
                <Label htmlFor="highestQualification">Highest Qualification *</Label>
                {
                    highestQualificationOptions.length > 0 ? (
                  <Select onValueChange={(value) => setValue("highestQualification", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select qualification" />
                    </SelectTrigger>
                    <SelectContent>
                      {highestQualificationOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                    ) : ( 
                  <Input
                    id="highestQualification"
                    {...register("highestQualification")}
                    className={errors.highestQualification ? "border-red-500" : ""}
                  />
                    ) 
                }
                {/* <Input
                  id="highestQualification"
                  {...register("highestQualification")}
                  className={errors.highestQualification ? "border-red-500" : ""}
                />
                {errors.highestQualification && (
                  <p className="text-red-500 text-sm mt-1">{errors.highestQualification.message}</p>
                )} */}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" {...register("address")} className={errors.address ? "border-red-500" : ""} />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
          </div>

          {/* Passport Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Passport Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passportNumber">Passport Number *</Label>
                <Input
                  id="passportNumber"
                  {...register("passportNumber")}
                  className={errors.passportNumber ? "border-red-500" : ""}
                />
                {errors.passportNumber && <p className="text-red-500 text-sm mt-1">{errors.passportNumber.message}</p>}
              </div>

              <div>
                <Label htmlFor="passportCountryOfIssue">Country of Issue *</Label>
                <Input
                  id="passportCountryOfIssue"
                  {...register("passportCountryOfIssue")}
                  className={errors.passportCountryOfIssue ? "border-red-500" : ""}
                />
                {errors.passportCountryOfIssue && (
                  <p className="text-red-500 text-sm mt-1">{errors.passportCountryOfIssue.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="passportDateOfIssue">Date of Issue *</Label>
                <Input
                  id="passportDateOfIssue"
                  type="date"
                  {...register("passportDateOfIssue")}
                  className={errors.passportDateOfIssue ? "border-red-500" : ""}
                />
                {errors.passportDateOfIssue && (
                  <p className="text-red-500 text-sm mt-1">{errors.passportDateOfIssue.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="passportExpiryDate">Expiry Date *</Label>
                <Input
                  id="passportExpiryDate"
                  type="date"
                  {...register("passportExpiryDate")}
                  className={errors.passportExpiryDate ? "border-red-500" : ""}
                />
                {errors.passportExpiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.passportExpiryDate.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* University Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">University Information</h3>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="isCosmopolitanStudent"
                checked={isCosmopolitanStudent}
                onCheckedChange={(checked) => {
                  setValue("isCosmopolitanStudent", checked as boolean)
                  setShowCosmopolitanFields(checked as boolean)
                }}
              />
              <Label htmlFor="isCosmopolitanStudent">Are you a Cosmopolitan University student?</Label>
            </div>

            {showCosmopolitanFields && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="course">Course</Label>
                  <Input id="course" {...register("course")} />
                </div>

                <div>
                  <Label htmlFor="program">Select Program</Label>
                  <Select onValueChange={(value) => setValue("program", value as any)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a program" />
                    </SelectTrigger>
                    <SelectContent>
                      {
                        undergradCourses.map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))
                      }
                      {/* Add more courses as needed */}
                      {/* <SelectItem value="AGRICULTURE">Agriculture</SelectItem>
                      }
                      {/* <SelectItem value="AGRIC_TECH">Agricultural Technology</SelectItem>
                      <SelectItem value="HEALTH_TECH">Health Technology</SelectItem>
                      <SelectItem value="ROBOTICS_INDUSTRIAL_AUTOMATION">Robotics & Industrial Automation</SelectItem>
                      <SelectItem value="AI_DATA_SCIENCE_ROBOTICS">AI, Data Science & Robotics</SelectItem> */}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
