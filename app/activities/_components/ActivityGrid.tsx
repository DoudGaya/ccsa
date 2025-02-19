import { SanityTypes } from "@/@types"
import SingleActivity from "./SingleActivity"
// import type { Activity } from "../types/activity"

interface ActivityGridProps {
  activities: SanityTypes.Activity[]
}

export default function ActivityGrid({ activities }: ActivityGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {activities.map((activity) => (
      <SingleActivity activity={activity} />
    ))}
    </div>
  )
}

