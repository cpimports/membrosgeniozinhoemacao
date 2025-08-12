'use server';
/**
 * @fileOverview An AI flow for recommending activities.
 *
 * - recommendActivities - A function that handles the activity recommendation process.
 * - RecommendActivitiesInput - The input type for the recommendActivities function.
 * - RecommendActivitiesOutput - The return type for the recommendActivities function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { Activity } from '@/lib/mock-data';

const ActivitySchema = z.object({
  id: z.string(),
  title: z.string(),
  category: z.string(),
  thumbnailUrl: z.string(),
  pdfUrl: z.string(),
  isFavorite: z.boolean(),
  aiHint: z.string(),
});

const RecommendActivitiesInputSchema = z.object({
  activities: z.array(ActivitySchema).describe('The list of all available activities.'),
  count: z.number().describe('The number of activities to recommend.'),
});
export type RecommendActivitiesInput = z.infer<typeof RecommendActivitiesInputSchema>;

const RecommendActivitiesOutputSchema = z.object({
  recommendations: z.array(ActivitySchema).describe('The list of recommended activities.'),
});
export type RecommendActivitiesOutput = z.infer<typeof RecommendActivitiesOutputSchema>;

export async function recommendActivities(input: RecommendActivitiesInput): Promise<RecommendActivitiesOutput> {
  return recommendActivitiesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'recommendActivitiesPrompt',
  input: {schema: RecommendActivitiesInputSchema},
  output: {schema: RecommendActivitiesOutputSchema},
  prompt: `You are an expert in child development and education.
  Your task is to recommend a specified number of engaging activities for children from a provided list.
  Select activities that are diverse and cover different areas of learning like literacy, numeracy, and motor skills.
  Prioritize activities that are marked as favorites.

  Here is the list of available activities:
  {{#each activities}}
  - Title: {{{title}}} (ID: {{{id}}}) - Category: {{{category}}} - Favorite: {{{isFavorite}}}
  {{/each}}
  
  Please recommend exactly {{{count}}} activities.`,
});

const recommendActivitiesFlow = ai.defineFlow(
  {
    name: 'recommendActivitiesFlow',
    inputSchema: RecommendActivitiesInputSchema,
    outputSchema: RecommendActivitiesOutputSchema,
  },
  async (input) => {
    const llmResponse = await prompt(input);
    const output = llmResponse.output;

    if (!output || !output.recommendations) {
        throw new Error("Failed to get recommendations from the model.");
    }
    
    // The model might return titles/ids that don't perfectly match.
    // We need to find the actual activity objects from the input list.
    const recommendedActivities = output.recommendations.map(recommended => {
        return input.activities.find(activity => activity.id === recommended.id || activity.title === recommended.title);
    }).filter((activity): activity is Activity => !!activity);

    // Ensure we return the correct number of activities, even if the model hallucinates.
    if (recommendedActivities.length < input.count) {
      const remaining = input.count - recommendedActivities.length;
      const additionalActivities = input.activities
        .filter(a => !recommendedActivities.some(ra => ra.id === a.id))
        .slice(0, remaining);
      recommendedActivities.push(...additionalActivities);
    }
    
    return { recommendations: recommendedActivities.slice(0, input.count) };
  }
);
