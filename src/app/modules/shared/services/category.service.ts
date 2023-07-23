import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.base_url;

@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    constructor(private http: HttpClient) { }
    /**
     * 
     * all categories
     */
    getCategories() {
        const endpoint = `${base_url}/categories`;
        return this.http.get(endpoint);
    }
    /**
 * 
 * save the Category
 */
    saveCategory(body: any) {
        const endpoint = `${base_url}/categories`;
        return this.http.post(endpoint, body);
    }
    /**
     * 
     * update the Category
     * @param id
     * @param body
     * @returns
     *  */
    updateCategory(id: string, body: any) {
        const endpoint = `${base_url}/categories/${id}`;
        return this.http.put(endpoint, body);
    }
    /**
     *  
     * delete the Category
     * @param id
     * @returns
     * */
    deleteCategory(id: string) {
        const endpoint = `${base_url}/categories/${id}`;
        return this.http.delete(endpoint);
    }
    /**
     * 
     * 
     * search the Category
     * @param term
     * @returns
     * */
    // searchCategory(id: ) {
    //     const endpoint = `${base_url}/categories/${id}`;
    //     return this.http.get(endpoint);
    // }
    getCategoryById(term: any) {
        const endpoint = `${base_url}/categories/${term}`;
        return this.http.get(endpoint);

    }

}


