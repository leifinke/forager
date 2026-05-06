import type { Recipe } from "../types/recipe";

export const recipes: Recipe[] = [
  {
    id: "rec_chickpea_miso_noodle_soup",
    name: "Chickpea Miso Noodle Soup",
    handle: "chickepa-miso-noodle-soup",
    description: "A healing broth made from lemon and miso is perfect for cold season.",
    category: "soup",
    prep_time: 10,
    cook_time: 25,
    servings: 4,
    image_url: "chickpea-miso-noodle-soup.jpg",
    instructions: [
      { id: "1s1", step_number: 1, content: "Heat olive oil in a medium pot over low heat. Add the chopped shallot and garlic with a pinch of salt. Cook for a few minutes until slowly translucent." },
      { id: "1s2", step_number: 2, content: "Add the vegetable broth and water and simmer for 20-30 minutes." },
      { id: "1s3", step_number: 3, content: "Optional: for a very clear soup, strain out the shallot and garlic pieces." },
      { id: "1s4", step_number: 4, content: "Add the chickpeas, pasta, and kale. Cook until the noodles are tender and cooked through, then reduce heat to low." },
      { id: "1s5", step_number: 5, content: "In a small bowl, whisk the miso with a few tablespoons of warm water until smooth and lump-free. Stir half the miso mixture into the soup along with a squeeze of lemon. Taste, and if more saltiness is needed, add the remaining miso water. Adjust lemon, salt, and pepper to taste." },
      { id: "1s6", step_number: 6, content: "Serve hot with crusty bread and pecorino cheese, if desired." },
    ],
  },
  {
    id: "rec_maple_sriracha_tofu_bowl",
    name: "Maple Sriracha Tofu Bowl",
    handle: "maple-sriracha-tofu-bowl",
    description: "These Maple Sriracha Tofu Bowls have the perfect amount of sweetness & spice. Served over rice with spicy mayo & sesame seeds.",
    category: "breakfast",
    prep_time: 10,
    cook_time: 20,
    servings: 4,
    image_url: "maple-sriracha-tofu-bowl.jpg",
    instructions: [
      { id: "2s1", step_number: 1, content: "Combine the soy sauce, maple syrup, sriracha, sesame oil, and ginger powder in a bowl and set aside." },
      { id: "2s2", step_number: 2, content: "Cut the tofu into cubes and toss with corn starch. Heat oil in a skillet over medium heat and add the tofu, making sure pieces don't touch. Cook until browned on most sides, about 4 sides per cube. Remove tofu from the skillet, add a little more oil, then add the garlic and green onion and cook for a couple of minutes." },
      { id: "2s3", step_number: 3, content: "Add the tofu back to the skillet and pour in the sauce. Toss until the tofu has absorbed all of the sauce, then remove from heat." },
      { id: "2s4", step_number: 4, content: "Serve the tofu over rice with avocado, sesame seeds, and spicy mayo." },
    ],
  },
];