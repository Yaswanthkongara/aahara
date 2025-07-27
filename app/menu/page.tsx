"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Clock, Star } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// This data would typically come from an API or database
const indianFoodData = {
  breakfast: [
    {
      id: "masala-dosa",
      name: "Masala Dosa",
      description: "Crispy rice crepe filled with spiced potato mixture",
      price: "₹80",
      rating: 4.5,
      prepTime: "15 min",
      image: "data:image/jpeg;base64,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",
      tags: ["South Indian", "Breakfast", "Vegetarian"],
    },
    {
      id: "chole-bhature",
      name: "Chole Bhature",
      description: "Spiced chickpea curry served with deep-fried bread",
      price: "₹100",
      rating: 4.7,
      prepTime: "25 min",
      image: "https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe.jpg",
      tags: ["North Indian", "Breakfast", "Vegetarian"],
    },
    {
      id: "idli-sambar",
      name: "Idli Sambar",
      description: "Steamed rice cakes served with lentil soup and chutneys",
      price: "₹60",
      rating: 4.4,
      prepTime: "20 min",
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2014/05/idli-sambar-1.jpg",
      tags: ["South Indian", "Breakfast", "Vegetarian"],
    },
    {
      id: "poha",
      name: "Poha",
      description: "Flattened rice cooked with onions, peanuts and spices",
      price: "₹50",
      rating: 4.3,
      prepTime: "20 min",
      image: "https://www.ohmyveg.co.uk/wp-content/uploads/2021/03/Poha-3-scaled-735x980.jpg",
      tags: ["Maharashtrian", "Breakfast", "Vegetarian"],
    },
    {
      id: "upma",
      name: "Upma",
      description: "Savory semolina porridge with vegetables",
      price: "₹55",
      rating: 4.2,
      prepTime: "20 min",
      image: "https://rakskitchen.net/wp-content/uploads/2013/02/upma-recipe-feat.jpg",
      tags: ["South Indian", "Breakfast", "Vegetarian"],
    },
    {
      id: "puri-bhaji",
      name: "Puri Bhaji",
      description: "Deep-fried bread served with spiced potato curry",
      price: "₹70",
      rating: 4.6,
      prepTime: "30 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMxqOkHzqZ2Mf6VTlAh36LPiBBPpATvS8hg&s",
      tags: ["North Indian", "Breakfast", "Vegetarian"],
    },
    {
      id: "vada-pav",
      name: "Vada Pav",
      description: "Spiced potato fritter in a bun with chutneys",
      price: "₹40",
      rating: 4.5,
      prepTime: "15 min",
      image: "https://blog.swiggy.com/wp-content/uploads/2024/11/Image-1_mumbai-vada-pav-1024x538.png",
      tags: ["Maharashtrian", "Breakfast", "Vegetarian", "Street Food"],
    },
    {
      id: "uttapam",
      name: "Uttapam",
      description: "Thick rice pancake topped with vegetables",
      price: "₹70",
      rating: 4.4,
      prepTime: "20 min",
      image: "https://rakskitchen.net/wp-content/uploads/2013/03/8527219504_0ddb2cde6f_z-500x500.jpg",
      tags: ["South Indian", "Breakfast", "Vegetarian"],
    },
    {
      id: "paratha",
      name: "Aloo Paratha",
      description: "Whole wheat flatbread stuffed with spiced potatoes",
      price: "₹60",
      rating: 4.6,
      prepTime: "25 min",
      image: "https://www.spiceupthecurry.com/wp-content/uploads/2022/05/paneer-paratha-2.jpg",
      tags: ["North Indian", "Breakfast", "Vegetarian"],
    },
    {
      id: "medu-vada",
      name: "Medu Vada",
      description: "Crispy lentil doughnuts served with sambar",
      price: "₹50",
      rating: 4.3,
      prepTime: "30 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfknB-9LfNYepyKnepv8PMW76WT_dFWQ5Ybg&s",
      tags: ["South Indian", "Breakfast", "Vegetarian"],
    },
    {
      id: "samosa",
      name: "Samosa",
      description: "Crispy pastry filled with spiced potatoes and peas",
      price: "₹30",
      rating: 4.7,
      prepTime: "40 min",
      image: "https://vegecravings.com/wp-content/uploads/2017/03/Aloo-Samosa-Recipe-Step-By-Step-Instructions.jpg",
      tags: ["North Indian", "Breakfast", "Vegetarian", "Street Food"],
    },
    {
      id: "dhokla",
      name: "Dhokla",
      description: "Steamed fermented rice and chickpea cake",
      price: "₹50",
      rating: 4.2,
      prepTime: "30 min",
      image: "https://www.yummyfoodrecipes.com/resources/picture/org/Khaman-Dhokla.jpg",
      tags: ["Gujarati", "Breakfast", "Vegetarian"],
    },
    {
      id: "kachori",
      name: "Kachori",
      description: "Deep-fried spiced lentil balls",
      price: "₹40",
      rating: 4.4,
      prepTime: "35 min",
      image: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajasthani_Raj_Kachori.jpg",
      tags: ["Rajasthani", "Breakfast", "Vegetarian", "Street Food"],
    },
    {
      id: "misal-pav",
      name: "Misal Pav",
      description: "Spicy sprouted moth beans curry with bread",
      price: "₹70",
      rating: 4.5,
      prepTime: "30 min",
      image: "https://myfoodstory.com/wp-content/uploads/2022/01/Misal-Pav-1.jpg",
      tags: ["Maharashtrian", "Breakfast", "Vegetarian"],
    },
    {
      id: "appam",
      name: "Appam",
      description: "Lacy rice pancakes with coconut milk",
      price: "₹60",
      rating: 4.3,
      prepTime: "25 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv4Wo2QTbvm1ljThhZJt6bfAnLWyOxMvioRg&s",
      tags: ["Kerala", "Breakfast", "Vegetarian"],
    },
    {
      id: "pesarattu",
      name: "Pesarattu",
      description: "Green gram dosa with ginger chutney",
      price: "₹65",
      rating: 4.2,
      prepTime: "20 min",
      image: "https://i.ytimg.com/vi/c0PQz7TF7RQ/maxresdefault.jpg",
      tags: ["Andhra", "Breakfast", "Vegetarian"],
    },
    {
      id: "thepla",
      name: "Thepla",
      description: "Spiced flatbread made with fenugreek leaves",
      price: "₹50",
      rating: 4.3,
      prepTime: "25 min",
      image: "https://pipingpotcurry.com/wp-content/uploads/2023/03/methi-thepla-recipe.jpg",
      tags: ["Gujarati", "Breakfast", "Vegetarian"],
    },
    {
      id: "pongal",
      name: "Pongal",
      description: "Rice and lentil porridge with pepper and cumin",
      price: "₹65",
      rating: 4.4,
      prepTime: "30 min",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/01/pongal-ven-pongal.jpg",
      tags: ["Tamil", "Breakfast", "Vegetarian"],
    },
    {
      id: "puttu",
      name: "Puttu",
      description: "Steamed rice cake with grated coconut",
      price: "₹55",
      rating: 4.2,
      prepTime: "20 min",
      image: "https://clubmahindra.gumlet.io/blog/media/section_images/ajourneyin-b1a9b6850cc6a2d.jpg?w=376&dpr=2.6",
      tags: ["Kerala", "Breakfast", "Vegetarian"],
    },
    {
      id: "sabudana-khichdi",
      name: "Sabudana Khichdi",
      description: "Sago pearls cooked with peanuts and potatoes",
      price: "₹60",
      rating: 4.3,
      prepTime: "25 min",
      image: "https://www.ohmyveg.co.uk/wp-content/uploads/2021/01/sabudana-khichdi-e1722865389647-1200x1200.jpg",
      tags: ["Maharashtrian", "Breakfast", "Vegetarian", "Fasting"],
    }
  ],
  mainCourse: [
    {
      id: "dal-makhani",
      name: "Dal Makhani",
      description: "Creamy black lentils cooked overnight",
      price: "₹120",
      rating: 4.6,
      prepTime: "30 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrqlmuM6fhCcLstM0zaHv2AFs-cusaSe5lUw&s",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "butter-chicken",
      name: "Butter Chicken",
      description: "Tender chicken in rich tomato-based curry",
      price: "₹180",
      rating: 4.8,
      prepTime: "35 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSegneEIjn7BXdB19uN6O6G3V030wDdHJC1Sw&s",
      tags: ["North Indian", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "palak-paneer",
      name: "Palak Paneer",
      description: "Cottage cheese cubes in creamy spinach gravy",
      price: "₹140",
      rating: 4.5,
      prepTime: "25 min",
      image: "https://seitansociety.com/wp-content/uploads/2021/10/PalakPaneer1280x903.jpg",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "chicken-biryani",
      name: "Chicken Biryani",
      description: "Aromatic rice dish with marinated chicken and spices",
      price: "₹200",
      rating: 4.9,
      prepTime: "45 min",
      image: "https://www.licious.in/blog/wp-content/uploads/2022/06/chicken-hyderabadi-biryani-01.jpg",
      tags: ["Hyderabadi", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "malai-kofta",
      name: "Malai Kofta",
      description: "Paneer and potato dumplings in rich cream sauce",
      price: "₹160",
      rating: 4.7,
      prepTime: "40 min",
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/malai-kofta-2-500x500.jpg",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "fish-curry",
      name: "Kerala Fish Curry",
      description: "Spicy fish curry with coconut milk and kokum",
      price: "₹160",
      rating: 4.7,
      prepTime: "30 min",
      image: "https://www.thedeliciouscrescent.com/wp-content/uploads/2023/07/Fish-Curry-7-500x500.jpg",
      tags: ["Kerala", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "chole-masala",
      name: "Chole Masala",
      description: "Spiced chickpea curry with blend of aromatic spices",
      price: "₹130",
      rating: 4.6,
      prepTime: "35 min",
      image: "https://i.ytimg.com/vi/qcDAv_wmesQ/maxresdefault.jpg",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "mutton-rogan-josh",
      name: "Mutton Rogan Josh",
      description: "Kashmiri style lamb curry with yogurt and spices",
      price: "₹220",
      rating: 4.8,
      prepTime: "50 min",
      image: "https://static.toiimg.com/thumb/53192600.cms?width=1200&height=900",
      tags: ["Kashmiri", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "paneer-butter-masala",
      name: "Paneer Butter Masala",
      description: "Cottage cheese in rich tomato-cream gravy",
      price: "₹150",
      rating: 4.7,
      prepTime: "30 min",
      image: "https://www.mygingergarlickitchen.com/wp-content/rich-markup-images/1x1/1x1-restaurant-style-paneer-butter-masala-paneer-makhani-video-recipe.jpg",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "prawn-curry",
      name: "Prawn Curry",
      description: "Coastal style prawns cooked in coconut curry",
      price: "₹190",
      rating: 4.6,
      prepTime: "25 min",
      image: "https://khinskitchen.com/wp-content/uploads/2022/07/prawn-curry-with-coconut-milk-07.jpg",
      tags: ["Coastal", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "baingan-bharta",
      name: "Baingan Bharta",
      description: "Smoky roasted eggplant mash with spices",
      price: "₹120",
      rating: 4.5,
      prepTime: "35 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRHdJF8EXH60ndf1h_7QddN_7GvZmY2EiMSA&s",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "chicken-tikka-masala",
      name: "Chicken Tikka Masala",
      description: "Grilled chicken pieces in spiced tomato gravy",
      price: "₹190",
      rating: 4.8,
      prepTime: "40 min",
      image: "https://bellyfull.net/wp-content/uploads/2021/05/Chicken-Tikka-Masala-blog.jpg",
      tags: ["North Indian", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "kadai-paneer",
      name: "Kadai Paneer",
      description: "Cottage cheese with bell peppers in spicy gravy",
      price: "₹160",
      rating: 4.6,
      prepTime: "30 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScVAKa5Hd4RaGtsmBVshz3hO4hdZ1A5ZSx_w&s",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "fish-moilee",
      name: "Fish Moilee",
      description: "Fish fillets in mild coconut curry",
      price: "₹180",
      rating: 4.5,
      prepTime: "35 min",
      image: "https://www.licious.in/blog/wp-content/uploads/2020/12/Fish-Molee.jpg",
      tags: ["Kerala", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "rajma-masala",
      name: "Rajma Masala",
      description: "Red kidney beans in thick tomato gravy",
      price: "₹130",
      rating: 4.6,
      prepTime: "40 min",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/05/rajma-recipe-rajma-masala.jpg",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "chicken-chettinad",
      name: "Chicken Chettinad",
      description: "Spicy chicken curry with black pepper and curry leaves",
      price: "₹170",
      rating: 4.7,
      prepTime: "45 min",
      image: "https://www.shanazrafiq.com/wp-content/uploads/2017/10/4-chicken-chettinad.jpg",
      tags: ["Tamil", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "mushroom-masala",
      name: "Mushroom Masala",
      description: "Button mushrooms in rich onion-tomato gravy",
      price: "₹140",
      rating: 4.4,
      prepTime: "25 min",
      image: "https://static.toiimg.com/thumb/75534551.cms?imgsize=2437474&width=800&height=800",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "goan-fish-curry",
      name: "Goan Fish Curry",
      description: "Tangy and spicy fish curry with kokum",
      price: "₹170",
      rating: 4.7,
      prepTime: "35 min",
      image: "https://www.chefkunalkapur.com/wp-content/uploads/2023/01/DSC08225-400x400.jpg?v=1674579659",
      tags: ["Goan", "Main Course", "Non-Vegetarian"],
    },
    {
      id: "bhindi-masala",
      name: "Bhindi Masala",
      description: "Okra cooked with onions and Indian spices",
      price: "₹110",
      rating: 4.3,
      prepTime: "25 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw7omcieXgrnQ6nShFiJ6zKpaE5Bwir2yP2w&s",
      tags: ["North Indian", "Main Course", "Vegetarian"],
    },
    {
      id: "tandoori-chicken",
      name: "Tandoori Chicken",
      description: "Clay oven roasted chicken marinated in yogurt and spices",
      price: "₹200",
      rating: 4.8,
      prepTime: "40 min",
      image: "https://sinfullyspicy.com/wp-content/uploads/2014/07/1200-by-1200-images-2.jpg",
      tags: ["North Indian", "Main Course", "Non-Vegetarian"],
    }
  ],
  riceBiryani: [
    {
      id: "veg-biryani",
      name: "Vegetable Biryani",
      description: "Fragrant rice with mixed vegetables and aromatic spices",
      price: "₹140",
      rating: 4.5,
      prepTime: "45 min",
      image: "https://madhurasrecipe.com/wp-content/uploads/2023/03/Veg-Biryani-2.jpg",
      tags: ["Hyderabadi", "Rice", "Vegetarian"],
    },
    {
      id: "chicken-biryani",
      name: "Chicken Biryani",
      description: "Layered rice dish with marinated chicken and saffron",
      price: "₹180",
      rating: 4.8,
      prepTime: "50 min",
      image: "https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani-5.jpg",
      tags: ["Hyderabadi", "Rice", "Non-Vegetarian"],
    },
    {
      id: "jeera-rice",
      name: "Jeera Rice",
      description: "Aromatic basmati rice tempered with cumin seeds",
      price: "₹100",
      rating: 4.4,
      prepTime: "20 min",
      image: "https://myfoodstory.com/wp-content/uploads/2018/07/Perfect-Jeera-Rice-Indian-Cumin-Rice-4.jpg",
      tags: ["North Indian", "Rice", "Vegetarian"],
    },
    {
      id: "lemon-rice",
      name: "Lemon Rice",
      description: "Tangy rice with peanuts, curry leaves and turmeric",
      price: "₹110",
      rating: 4.3,
      prepTime: "25 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsDhP_3GxHU27qgD0whesQEDg-vUFBvFbXWA&s",
      tags: ["South Indian", "Rice", "Vegetarian"],
    },
    {
      id: "veg-pulao",
      name: "Vegetable Pulao",
      description: "Rice cooked with mixed vegetables and whole spices",
      price: "₹130",
      rating: 4.5,
      prepTime: "35 min",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2018/07/pulao-recipe.jpg",
      tags: ["North Indian", "Rice", "Vegetarian"],
    },
    {
      id: "mushroom-pulao",
      name: "Mushroom Pulao",
      description: "Fragrant rice cooked with mushrooms and aromatic spices",
      price: "₹150",
      rating: 4.6,
      prepTime: "30 min",
      image: "https://www.funfoodfrolic.com/wp-content/uploads/2022/06/Mushroom-Pulao-Blog.jpg",
      tags: ["North Indian", "Rice", "Vegetarian"],
    }
  ],
  desserts: [
    {
      id: "gulab-jamun",
      name: "Gulab Jamun",
      description: "Deep-fried milk solids soaked in sugar syrup",
      price: "₹60",
      rating: 4.7,
      prepTime: "20 min",
      image: "https://www.chefadora.com/_next/image?url=https%3A%2F%2Fchefadora.b-cdn.net%2F003f0f0351967a7cb6212a8d9bfaf889_f956154e73.jpg&w=3840&q=75",
      tags: ["Sweet", "Dessert", "Vegetarian"],
    },
    {
      id: "rasmalai",
      name: "Rasmalai",
      description: "Soft cottage cheese dumplings in saffron milk",
      price: "₹70",
      rating: 4.6,
      prepTime: "25 min",
      image: "https://www.indianhealthyrecipes.com/wp-content/uploads/2013/10/rasmalai-recipe-1-480x270.jpg",
      tags: ["Bengali", "Dessert", "Vegetarian"],
    },
    {
      id: "kheer",
      name: "Rice Kheer",
      description: "Creamy rice pudding with cardamom and nuts",
      price: "₹65",
      rating: 4.5,
      prepTime: "45 min",
      image: "https://www.cookwithmanali.com/wp-content/uploads/2017/06/Indian-Rice-Kheer-500x500.jpg",
      tags: ["North Indian", "Dessert", "Vegetarian"],
    },
    {
      id: "jalebi",
      name: "Jalebi",
      description: "Crispy, syrupy spirals made from fermented batter",
      price: "₹50",
      rating: 4.7,
      prepTime: "30 min",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp-Y90m3d_y_n74JD9YoNQ5DChmF0qxSULYw&s",
      tags: ["Sweet", "Dessert", "Vegetarian"],
    },
    {
      id: "motichoor-ladoo",
      name: "Motichoor Ladoo",
      description: "Sweet balls made from tiny gram flour pearls",
      price: "₹55",
      rating: 4.6,
      prepTime: "40 min",
      image: "https://madhurasrecipe.com/wp-content/uploads/2023/09/Ladu-Featured-Image.jpg",
      tags: ["North Indian", "Dessert", "Vegetarian"],
    },
    {
      id: "gajar-ka-halwa",
      name: "Gajar ka Halwa",
      description: "Traditional carrot pudding with nuts and cardamom",
      price: "₹75",
      rating: 4.8,
      prepTime: "50 min",
      image: "https://www.vegrecipesofindia.com/wp-content/uploads/2021/11/gajar-halwa-carrot-halwa.jpg",
      tags: ["North Indian", "Dessert", "Vegetarian"],
    }
  ]
}

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("breakfast")
  const { toast } = useToast()

  const handleAddToCart = () => {
    toast({
      title: "Added to cart",
      description: "Your item has been added to the cart.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Our Menu</h1>
          <p className="text-muted-foreground">Explore our wide range of authentic Indian dishes</p>
        </div>
      </div>

      <Tabs defaultValue="breakfast" value={activeCategory} onValueChange={setActiveCategory}>
        <TabsList>
          <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
          <TabsTrigger value="mainCourse">Main Course</TabsTrigger>
          <TabsTrigger value="riceBiryani">Rice & Biryani</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
        </TabsList>

        <TabsContent value="breakfast">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indianFoodData.breakfast.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge variant="secondary">{item.price}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{item.rating}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.prepTime}
                      </div>
                    </div>
                    <Button size="sm" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="mainCourse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indianFoodData.mainCourse.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge variant="secondary">{item.price}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{item.rating}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.prepTime}
                      </div>
                    </div>
                    <Button size="sm" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="riceBiryani">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indianFoodData.riceBiryani.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge variant="secondary">{item.price}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{item.rating}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.prepTime}
                      </div>
                    </div>
                    <Button size="sm" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="desserts">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {indianFoodData.desserts.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="aspect-video relative rounded-md overflow-hidden mb-4">
                    <img src={item.image} alt={item.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Badge variant="secondary">{item.price}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{item.rating}</span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-1" />
                        {item.prepTime}
                      </div>
                    </div>
                    <Button size="sm" onClick={handleAddToCart}>
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

