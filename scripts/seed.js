const db = require('../src/db');

const recipes = [
  {
    title: 'Classic Pancakes',
    description: 'Fluffy buttermilk pancakes perfect for a weekend breakfast.',
    ingredients: JSON.stringify(['2 cups flour', '2 tbsp sugar', '1 tsp baking powder', '1/2 tsp baking soda', '2 eggs', '1.5 cups buttermilk', '3 tbsp melted butter']),
    instructions: '1. Mix dry ingredients.\n2. Whisk eggs, buttermilk, and butter.\n3. Combine wet and dry ingredients.\n4. Cook on a greased griddle until bubbles form, then flip.',
    category: 'breakfast', prep_time: 10, cook_time: 15, servings: 4
  },
  {
    title: 'Caesar Salad',
    description: 'Crisp romaine with homemade Caesar dressing and croutons.',
    ingredients: JSON.stringify(['1 head romaine lettuce', '1/2 cup parmesan', '1 cup croutons', '2 cloves garlic', '2 anchovy fillets', '1 egg yolk', '1 tbsp lemon juice', '1/3 cup olive oil']),
    instructions: '1. Mash garlic and anchovies into a paste.\n2. Whisk in egg yolk and lemon juice.\n3. Slowly drizzle in olive oil.\n4. Toss with romaine, parmesan, and croutons.',
    category: 'lunch', prep_time: 15, cook_time: 0, servings: 2
  },
  {
    title: 'Spaghetti Bolognese',
    description: 'Rich and hearty Italian meat sauce over spaghetti.',
    ingredients: JSON.stringify(['400g spaghetti', '500g ground beef', '1 onion diced', '2 cloves garlic', '400g crushed tomatoes', '2 tbsp tomato paste', '1 tsp oregano', 'Salt and pepper']),
    instructions: '1. Brown beef in a large pan, drain fat.\n2. Sauté onion and garlic until soft.\n3. Add tomatoes, paste, and oregano.\n4. Simmer 30 minutes.\n5. Cook spaghetti and serve with sauce.',
    category: 'dinner', prep_time: 10, cook_time: 40, servings: 4
  },
  {
    title: 'Chicken Stir-Fry',
    description: 'Quick and colorful chicken stir-fry with vegetables.',
    ingredients: JSON.stringify(['500g chicken breast sliced', '1 bell pepper', '1 cup broccoli', '2 carrots', '3 tbsp soy sauce', '1 tbsp sesame oil', '1 tbsp cornstarch', '2 cloves garlic', 'Rice for serving']),
    instructions: '1. Marinate chicken in soy sauce and cornstarch.\n2. Stir-fry chicken until cooked, set aside.\n3. Stir-fry vegetables with garlic.\n4. Return chicken, add sesame oil.\n5. Serve over rice.',
    category: 'dinner', prep_time: 15, cook_time: 10, servings: 3
  },
  {
    title: 'Chocolate Chip Cookies',
    description: 'Chewy chocolate chip cookies with crispy edges.',
    ingredients: JSON.stringify(['2.25 cups flour', '1 cup butter softened', '3/4 cup sugar', '3/4 cup brown sugar', '2 eggs', '1 tsp vanilla', '1 tsp baking soda', '2 cups chocolate chips']),
    instructions: '1. Cream butter and sugars.\n2. Beat in eggs and vanilla.\n3. Mix in flour and baking soda.\n4. Fold in chocolate chips.\n5. Bake at 375°F for 9-11 minutes.',
    category: 'dessert', prep_time: 15, cook_time: 11, servings: 36
  },
  {
    title: 'Greek Yogurt Parfait',
    description: 'Layered yogurt with granola and fresh berries.',
    ingredients: JSON.stringify(['2 cups Greek yogurt', '1 cup granola', '1 cup mixed berries', '2 tbsp honey']),
    instructions: '1. Layer yogurt, granola, and berries in a glass.\n2. Repeat layers.\n3. Drizzle with honey.',
    category: 'snack', prep_time: 5, cook_time: 0, servings: 2
  },
  {
    title: 'Grilled Cheese Sandwich',
    description: 'Golden, crispy grilled cheese with melted cheddar.',
    ingredients: JSON.stringify(['4 slices bread', '4 slices cheddar cheese', '2 tbsp butter']),
    instructions: '1. Butter one side of each bread slice.\n2. Place cheese between unbuttered sides.\n3. Grill on medium heat until golden on both sides.',
    category: 'lunch', prep_time: 5, cook_time: 8, servings: 2
  },
  {
    title: 'Banana Smoothie',
    description: 'Creamy banana smoothie with peanut butter.',
    ingredients: JSON.stringify(['2 bananas', '1 cup milk', '2 tbsp peanut butter', '1 tbsp honey', '1/2 cup ice']),
    instructions: '1. Add all ingredients to a blender.\n2. Blend until smooth.\n3. Pour and serve immediately.',
    category: 'breakfast', prep_time: 5, cook_time: 0, servings: 2
  }
];

const stmt = db.prepare('INSERT INTO recipes (title, description, ingredients, instructions, category, prep_time, cook_time, servings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
const insertAll = db.transaction((items) => {
  for (const r of items) stmt.run(r.title, r.description, r.ingredients, r.instructions, r.category, r.prep_time, r.cook_time, r.servings);
});

insertAll(recipes);
console.log(`Seeded ${recipes.length} recipes.`);
