export  interface Simple {
  id: number;  
  categoryId: number;
  category: Category;   
  name: string;   
}

export interface Category {
  id: number;
  name: string;
}


export interface Item {
    id: number;
    name: string;
    categoryId: number; // FK to the category table row (the id for home, hats, purses, or fashion)
    description: string;   
    estimatedValue: number;
    imageDirectory: string;  // this is a directory which contains pictures of images
    imageName: string;
    // This is why we DO NOT NEED the following property
    // image: File; 

    // When an item is http.sent, it's image is sent via...
    // FormData.append("image", file, fileName)
    // in the same way that the id, name, etc are sent
    //
    // When an item is received using http.get, the image will NOT come back as a File,
    // and will instead be returned as a Base64 string in the imageName.
    //

}

export interface Image {
      id: number;
      itemId: number;    // required FK to item table
      imageNameB64: string;

      // An imageFile is http.sent, via
      // FormData.append("imageFile", file, fileName)
      //
      // An imageFile is received as a Base64 string
}


// MLS Remove the following: OLD
export interface ItemAndImages {
  // item: Item;           // this contains the data
  id: number;
  name: string;
  category: string; // home or fashion for now.
  description: string;
  estimatedValue: number;
  imageDirectory: string;  // this is a directory which contains pictures of images
  imageName: string;      // primary images

  // images: FormData;   // this piece contains all the images
  images: File[];
}

export type Profile = {
  id?: string;
  userPrincipalName?: string;
  businessPhones?: Array<string>;
  displayName?: string;
  givenName?: string;
  jobTitle?: string;
  mail?: string;
  mobilePhone?: string;
  officeLocation?: string;
  preferredLanguage?: string;
  surname?: string;
};

