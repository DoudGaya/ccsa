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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { programApplicationSchema } from "@/lib/schemas"
import { programApplicationSchema } from "@/lib/schema"
import { createProgramApplication } from "@/actions/program-application"
import { toast } from "@/hooks/use-toast"

type FormData = z.infer<typeof programApplicationSchema>

export default function ProgramApplicationForm() {
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
    defaultValues: {
      isCosmopolitanStudent: false,
    },
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
  ]

  const programOptions = [
    { value: "CHINA_CLIMATE_SMART_AGRICULTURE", label: "Climate-Smart Agriculture" },
    { value: "CHINA_ADVANCED_TECHNOLOGIES", label: "Advanced Technologies" },
    { value: "CHINA_HEALTH_SCIENCES", label: "Health Sciences" },
  ]

  const isCosmopolitanStudent = watch("isCosmopolitanStudent")
  const selectedDuration = watch("duration")
  const selectedProgram = watch("program")

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      // Combine program and duration for the final program value
      let finalProgram = data.program
      if (data.program && data.duration) {
        const programBase = data.program.replace(/_1M$|_4M$/, "")
        finalProgram = `${programBase}_${data.duration === "1month" ? "1M" : "4M"}` as any
      }

      const submissionData = {
        ...data,
        program: finalProgram,
      }

      const result = await createProgramApplication(submissionData)

      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Success!",
          description: "Your application has been submitted successfully.",
        })
        reset()
        setShowCosmopolitanFields(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Program Application Form</CardTitle>
        <p className="text-gray-600 dark:text-gray-400">
          Complete the form below to apply for the International Capacity Development Program in China.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                <Select onValueChange={(value) => setValue("highestQualification", value)}>
                  <SelectTrigger className={errors.highestQualification ? "border-red-500" : ""}>
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
                {errors.highestQualification && (
                  <p className="text-red-500 text-sm mt-1">{errors.highestQualification.message}</p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Textarea id="address" {...register("address")} className={errors.address ? "border-red-500" : ""} />
              {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
            </div>
          </div>

          {/* Program Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Program Selection</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="program">Select Program *</Label>
                <Select onValueChange={(value) => setValue("program", value as any)}>
                  <SelectTrigger className={errors.program ? "border-red-500" : ""}>
                    <SelectValue placeholder="Choose a program" />
                  </SelectTrigger>
                  <SelectContent>
                    {programOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.program && <p className="text-red-500 text-sm mt-1">{errors.program.message}</p>}
              </div>

              <div>
                <Label htmlFor="duration">Duration *</Label>
                <Select onValueChange={(value) => setValue("duration", value as any)}>
                  <SelectTrigger className={errors.duration ? "border-red-500" : ""}>
                    <SelectValue placeholder="Choose duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="4month">4 Months</SelectItem>
                  </SelectContent>
                </Select>
                {errors.duration && <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>}
              </div>
            </div>

            {selectedProgram && selectedDuration && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Selected:</strong> {programOptions.find((p) => p.value === selectedProgram)?.label} -{" "}
                  {selectedDuration === "1month" ? "1 Month" : "4 Months"} Program
                </p>
              </div>
            )}
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
            <h3 className="text-lg font-semibold border-b pb-2">University Information (Optional)</h3>

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
                  <Label htmlFor="course">Course/Program of Study</Label>
                  <Select onValueChange={(value) => setValue("course", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your course" />
                    </SelectTrigger>
                    <SelectContent>
                      {undergradCourses.map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset()
                setShowCosmopolitanFields(false)
              }}
            >
              Reset Form
            </Button>
            <Button type="submit" disabled={isSubmitting} className=" bg-brand min-w-[120px]">
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit Application
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
