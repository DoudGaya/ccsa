"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type * as z from "zod"
import { Gender } from "@prisma/client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { eventBookingSchema } from "@/lib/schema"
import { createEventBooking } from "@/actions/events"
import { toast } from "sonner"

type FormData = z.infer<typeof eventBookingSchema>

interface EventBookingModalProps {
  eventName: string
  onClose: () => void
}

const eventOptions = [
  { value: "Agricultural Innovation Summit", label: "Agricultural Innovation Summit" },
  { value: "Tech for Africa Conference", label: "Tech for Africa Conference" },
  { value: "Youth Empowerment Workshop", label: "Youth Empowerment Workshop" },
  { value: "Sustainable Farming Seminar", label: "Sustainable Farming Seminar" },
  { value: "Digital Skills Training", label: "Digital Skills Training" },
]

export default function EventBookingModal({ eventName, onClose }: EventBookingModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(eventBookingSchema),
    defaultValues: {
      event: eventName || "",
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const result = await createEventBooking(data)

      if (result.error) {
        toast.error(result.error)
      } else {
        toast.success(result.success || "Event booked successfully!")
        reset()
        onClose()
      }
    } catch (error) {
      console.error("Submission error:", error)
      toast.error("Failed to book event. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register("name")}
          className={errors.name ? "border-red-500" : ""}
          placeholder="Enter your full name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
          placeholder="Enter your email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          {...register("phone")}
          className={errors.phone ? "border-red-500" : ""}
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
      </div>

      <div>
        <Label htmlFor="organization">Organization *</Label>
        <Input
          id="organization"
          {...register("organization")}
          className={errors.organization ? "border-red-500" : ""}
          placeholder="Enter your organization"
        />
        {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization.message}</p>}
      </div>

      <div>
        <Label htmlFor="event">Select Event *</Label>
        <Input
          id="event"
            {...register("event")}
            className={errors.event ? "border-red-500" : ""}
            placeholder="Choose an event"
            value={ eventName || "" } // Use eventName prop as default value
        />
        {/* <Select onValueChange={(value) => setValue("event", value)} defaultValue={eventName}>
          <SelectTrigger className={errors.event ? "border-red-500" : ""}>
            <SelectValue placeholder="Choose an event" />
          </SelectTrigger>
          <SelectContent>
            {eventOptions.map((event) => (
              <SelectItem key={event.value} value={event.value}>
                {event.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}
        {errors.event && <p className="text-red-500 text-sm mt-1">{errors.event.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="gender">Gender *</Label>
          <Select onValueChange={(value) => setValue("gender", value as Gender)}>
            <SelectTrigger className={errors.gender ? "border-red-500" : ""}>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={Gender.Male}>Male</SelectItem>
              <SelectItem value={Gender.Female}>Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>}
        </div>

        <div>
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            type="number"
            {...register("age")}
            className={errors.age ? "border-red-500" : ""}
            placeholder="Enter your age"
          />
          {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age.message}</p>}
        </div>
      </div>

      <div>
        <Label htmlFor="role">Your Role/Position *</Label>
        <Input
          id="role"
          {...register("role")}
          className={errors.role ? "border-red-500" : ""}
          placeholder="e.g., Student, Professional, Farmer"
        />
        {errors.role && <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Booking..." : "Book Event"}
        </Button>
      </div>
    </form>
  )
}