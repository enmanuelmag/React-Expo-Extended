import z from 'zod';

//Pokemon base
export const PokemonBaseSchema = z.object({
  name: z.string(),
  url: z.string().url(),
});

export type PokemonBaseType = z.infer<typeof PokemonBaseSchema>;

//Pokemon
export const PokemonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  weight: z.number(),
  height: z.number(),
  abilities: z.array(
    z.object({
      ability: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
      is_hidden: z.boolean(),
      slot: z.number(),
    }),
  ),
  sprites: z.object({
    front_default: z.string().url(),
    front_female: z.string().url().nullable(),
    front_shiny: z.string().url().nullable(),
    back_default: z.string().url().nullable(),
    back_shiny: z.string().url().nullable(),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      stat: z.object({
        name: z.string(),
      }),
    }),
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({
        name: z.string(),
        url: z.string().url(),
      }),
    }),
  ),
  cries: z.object({
    latest: z.string().url(),
    legacy: z.string().url(),
  }),
});

export type PokemonDetailType = z.infer<typeof PokemonDetailSchema>;

//Get Pokemon Base params
export const GetPokemonBaseParamsSchema = z.object({
  limit: z.number().int(),
  offset: z.number().int(),
});

export type GetPokemonBaseParamsType = z.infer<typeof GetPokemonBaseParamsSchema>;

//Get Pokemon params
export const GetPokemonParamsSchema = z.object({
  id: z.string(),
});

export type GetPokemonParamsType = z.infer<typeof GetPokemonParamsSchema>;

//Pokemon API Response
export const PokemonApiResponseSchema = z.object({
  count: z.number().int(),
  next: z.string().url().nullable(),
  previous: z.string().url().nullable(),
  results: z.array(PokemonBaseSchema),
});

export type PokemonApiResponse = z.infer<typeof PokemonApiResponseSchema>;
