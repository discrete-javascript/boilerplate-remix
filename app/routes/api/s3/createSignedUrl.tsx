import { ActionFunction, json } from "remix"
import { z } from "zod"

import { validateFormData } from "~/lib/form"
import { badRequest } from "~/lib/remix"
import { createSignedUrl } from "~/services/s3/s3.service"

export type GetSignedUrlActionData = ReturnType<typeof createSignedUrl>

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()

  const creatSignedUrlSchema = z.object({ key: z.string(), contentType: z.string() })

  const { data, fieldErrors } = await validateFormData(creatSignedUrlSchema, formData)
  if (fieldErrors) return badRequest({ fieldErrors, data })

  return json(createSignedUrl(data))
}
