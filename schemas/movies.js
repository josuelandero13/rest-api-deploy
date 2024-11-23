const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().int().positive().min(1900).max(2024),
  director: z.string(),
  duration: z.number().int().positive(),
  poster: z.string().url({
    message: 'Poster must be a valid URL'
  }),
  genre: z.array(
    z.enum(
      [
        'Action',
        'Adventure',
        'Animation',
        'Comedy',
        'Documentary',
        'Drama',
        'Horror',
        'Music',
        'Mystery',
        'Romance',
        'Sci-Fi',
        'Thriller',
        'Crime'
      ],
      {
        required_error: 'Genre is required',
        invalid_type_error: 'Rate must be a number'
      }
    )
  ),
  rate: z.number().min(0).max(10).default(5)
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validateMovieUpdated (shape) {
  return movieSchema.partial().safeParse(shape)
}

module.exports = { validateMovie, validateMovieUpdated }
