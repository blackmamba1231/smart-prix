    import { useState } from "react";
    import { Button } from "@/components/ui/button";
    import { Input } from "@/components/ui/input";
    import { Label } from "@/components/ui/label";
    import { Textarea } from "@/components/ui/textarea";
    import { storeData } from "@/types/store";
    import { createStore, fetchStoreData } from "@/lib/api";
import { Card, CardContent } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Globe, Key, Upload, Webhook, Zap } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import axios from 'axios';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
    interface CreateStoreFormProps {
    onSuccess: () => void;
    }

    export function CreateStoreForm({ onSuccess }: CreateStoreFormProps) {
      



    const [formData, setFormData] = useState<Partial<storeData>>({
        activated: true,
        clicks: 0,
        revenue: 0,
        conversionRate: 0,
    });
    const [loading, setLoading] = useState(false);
    

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
        await createStore(formData);
        onSuccess();
        } catch (error) {
        console.error('Failed to create store:', error);
        } finally {
        setLoading(false);
        }
    };


const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxFileSizeMB = 2;
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        alert('File size exceeds 2MB. Please select a smaller file.');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
      }
  
      const formData = new FormData();
      formData.append('file', file);
  
      try {
        const { data } = await axios.post(process.env.NEST_PUBLIC_BACKEND_URL + '/upload/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setFormData((prevData) => ({ ...prevData, logo: data.url }));
      } catch (error) {
        console.error('Image upload failed:', error);
        alert('Failed to upload image. Please try again.');
      }
    }
  };
  
      const handleInputChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
      const handleInputCategoryChange = ( value: string) => {
        setSelectedCategories((prev) =>
            prev.includes(value)
              ? prev.filter((category) => category !== value) // Remove if already selected
              : [...prev, value] // Add if not selected
          );
        setFormData((prevData) => {
            const currentCategories = prevData.categories || [];
            const isAlreadySelected = currentCategories.includes(value);
        
            return {
              ...prevData,
              categories: isAlreadySelected
                ? currentCategories.filter((category) => category !== value) // Remove category
                : [...currentCategories, value], // Add category
            };
          });
      } 
    return (
        <div className="
       w-full min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-full mx-auto py-3 space-y-3">
        <div className="flex items-center justify-center">
        <h3 className="text-4xl font-extrabold mb-8 text-center bg-clip-text "> Create Store </h3>

        </div>
        <Card className="backdrop-blur-sm bg-white/70 shadow-xl border-0 py-4">
          <CardContent className="p-8">
            <Tabs defaultValue="basic" className="space-y-8">
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-purple-100 p-1 rounded-lg">
                <TabsTrigger
                  value="basic"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700"
                >
                  Basic Information
                </TabsTrigger>
                <TabsTrigger
                  value="affiliate"
                  className="rounded-md data-[state=active]:bg-white data-[state=active]:text-purple-700"
                >
                  Affiliate Details
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-8">
                <TabsContent value="basic" className="space-y-5">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Store Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder="Enter store name"
                        className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storeURL" className="text-sm font-medium text-gray-700">
                        Store URL
                      </Label>
                      <div className="relative">
                        <Globe
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <Input
                          id="url"
                          value={formData.url}
                          onChange={(e) => handleInputChange('storeURL', e.target.value)}
                          placeholder="https://example.com"
                          type="url"
                          className="pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                 <div className="flex items-center space-x-20">
                 <div className="space-y-2">
                    <Label htmlFor="logo" className="text-sm font-medium text-gray-700">
                      Logo Upload
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('logo')?.click()}
                        className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                      >
                        <Upload className="mr-2" size={18} />
                        Choose File
                      </Button>
                      <Input
                        id="logo"
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*"
                      />
                      <span className="text-sm text-gray-500">
                        {formData.logo ? formData.logo : 'No file chosen'}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="logo" className="text-sm font-medium text-gray-700">
                      Store Banner Upload
                    </Label>
                    <div className="flex items-center space-x-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('')?.click()}
                        className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                      >
                        <Upload className="mr-2" size={18} />
                        Choose File
                      </Button>
                      <Input
                        id="logo"
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                        accept="image/*"
                      />
                      <span className="text-sm text-gray-500">
                        {formData.logo ? formData.logo : 'No file chosen'}
                      </span>
                    </div>
                  </div>
                 </div>
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Description
                    </Label>
                    <Textarea
                    id="description"
                    value={
                      formData.description
                    }
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Enter description"
                    className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    ></Textarea>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="categories" className="text-sm font-medium text-gray-700">
                      Categories
                    </Label>
                    <Select
                        onValueChange={(value) => handleInputCategoryChange(value)}
                        
                      >
                        <SelectTrigger className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="Select Categories" />
                        </SelectTrigger>
                        <SelectContent className="bg-white ">
                          <SelectItem className="hover:bg-gray-300 hover:cursor-pointer" value="Electronics">Electronics</SelectItem>
                          <SelectItem className="hover:bg-gray-300 hover:cursor-pointer" value="Clothing">Clothing</SelectItem>
                          <SelectItem className="hover:bg-gray-300 hover:cursor-pointer" value="Home">Home</SelectItem>
                          <SelectItem className="hover:bg-gray-300 hover:cursor-pointer" value="Beauty">Beauty</SelectItem>
                          <SelectItem className="hover:bg-gray-300 hover:cursor-pointer" value="Health">Health</SelectItem>
                          <SelectItem className="hover:bg-gray-300 hover:cursor-pointer" value="Toys">Toys</SelectItem>
                          <SelectItem className="hover:bg-gray-300 hover:cursor-pointer" value="Sports">Sports</SelectItem>
                          <SelectItem className="hover:bg-gray-300 hover:cursor-pointer" value="Books">Books</SelectItem>

                        </SelectContent>
                      </Select>
                  </div>
                  <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700">Selected Categories:</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedCategories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm border border-purple-300"
              >
                {category}
              </span>
            ))}
            {selectedCategories.length === 0 && (
              <span className="text-gray-500 text-sm">No categories selected</span>
            )}
          </div>
        </div>
        <div className="space-y-2">
                      <Label htmlFor="priority" className="text-sm font-medium text-gray-700">
                        Priority
                      </Label>
                      <Input
                        id="priority"
                        type="number"
                        value={formData.priority}
                        onChange={(e) => handleInputChange('priority', e.target.value)}
                        placeholder="Select the Priority for your Store, i.e. 1,2,3,4"
                        className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="CashbackRate" className="text-sm font-medium text-gray-700">
                        Cashback Rate
                      </Label>
                      <Input
                        id="CashbackRate"
                        type="number"
                        value={formData.CashbackRate}
                        onChange={(e) => handleInputChange('CashbackRate', e.target.value)}
                        placeholder="Set the Cashback Rate"
                        className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="StoreContactPersonName" className="text-sm font-medium text-gray-700">
                      Contact Person Name
                      </Label>
                      <Input
                        id="StoreContactPersonName"
                        type="string"
                        value={formData.StoreContactPersonName}
                        onChange={(e) => handleInputChange('StoreContactPersonName', e.target.value)}
                        placeholder="Store Contact Person Name "
                        className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="StorePersonEmail" className="text-sm font-medium text-gray-700">
                      Contact Person Email
                      </Label>
                      <Input
                        id="StorePersonEmail"
                        type="string"
                        value={formData.StorePersonEmail}
                        onChange={(e) => handleInputChange('StorePersonEmail', e.target.value)}
                        placeholder="Store Contact Person Name "
                        className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="StorePersonPhone" className="text-sm font-medium text-gray-700">
                      Contact Person Phone
                      </Label>
                      <Input
                        id="StorePersonPhone"
                        type="tel"
                        maxLength={10}
                        value={formData.StorePersonPhone}
                        onChange={(e) => handleInputChange('StorePersonPhone', e.target.value)}
                        placeholder="Store Contact Person Phone "
                        className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="SEOTitle" className="text-sm font-medium text-gray-700">
                       SEO Title
                      </Label>
                      <Input
                        id="SEOTitle"
                        type="string"
                        value={formData.SEOTitle}
                        onChange={(e) => handleInputChange('SEOTitle', e.target.value)}
                        placeholder="SEO title for the Store "
                        className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                    <div className="space-y-2">
                    <Label htmlFor="MetaDescription" className="text-sm font-medium text-gray-700">
                      Meta Description
                    </Label>
                    <Textarea
                    id="MetaDescription"
                    value={
                      formData.MetaDescription
                    }
                    onChange={(e) => handleInputChange('MetaDescription', e.target.value)}
                    placeholder="Enter Meta description"
                    className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    ></Textarea>
                  </div>
                </TabsContent>

                <TabsContent value="affiliate" className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="affiliateNetwork" className="text-sm font-medium text-gray-700">
                        Affiliate Network
                      </Label>
                      <Select
                        onValueChange={(value) => handleInputChange('affiliateNetwork', value)}
                        defaultValue={formData.AffiliateNetwork}
                      >
                        <SelectTrigger className="rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                          <SelectValue placeholder="Select network" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admitad">Admitad</SelectItem>
                          <SelectItem value="Cuelinks">Cuelinks</SelectItem>
                          <SelectItem value="Rakuten">Rakuten</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="affiliateID" className="text-sm font-medium text-gray-700">
                        Affiliate ID
                      </Label>
                      <div className="relative">
                        <Zap
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <Input
                          id="affiliateID"
                          value={formData.AffiliateId}
                          onChange={(e) => handleInputChange('affiliateID', e.target.value)}
                          placeholder="Enter affiliate ID"
                          className="pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
                      API Key
                    </Label>
                    <div className="relative">
                      <Key
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        id="apiKey"
                        value={formData.ApiKey}
                        onChange={(e) => handleInputChange('apiKey', e.target.value)}
                        placeholder="Enter API key"
                        className="pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    
                    <Label htmlFor="AffiliateUrl" className="text-sm font-medium text-gray-700">
                      Affiliate URL
                    </Label>
                    <div className="relative">
                    <Globe
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                      <Input
                        id="AffiliateUrl"
                        value={formData.AffiliateUrl}
                        onChange={(e) => handleInputChange('AffiliateUrl', e.target.value)}
                        placeholder="Enter Affiliate URL"
                        className="pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="webhookEndpoint" className="text-sm font-medium text-gray-700">
                      Webhook Endpoint
                    </Label>
                    <div className="relative">
                      <Webhook
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={18}
                      />
                      <Input
                        id="webhookEndpoint"
                        value={formData.webhookEndpoint}
                        onChange={(e) => handleInputChange('webhookEndpoint', e.target.value)}
                        placeholder="Enter webhook URL"
                        type="url"
                        className="pl-10 rounded-md border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                </TabsContent>

                <Separator className="my-8" />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Save Store Data
                  </Button>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
    );
    }