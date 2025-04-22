import vine from '@vinejs/vine'

export const urlValidator = vine.compile(
  vine.object({
    longURL: vine.string().activeUrl(),
  })
)
