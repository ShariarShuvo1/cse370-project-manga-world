package com.amakakeru.mangaworld.Controller;


import com.amakakeru.mangaworld.Entity.Category;
import com.amakakeru.mangaworld.Repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/allCategories")
    public List<Category> getMangaByCategory() {
//        select c1_0.c_id,c1_0.c_name from category c1_0
        return categoryRepository.findAll();
    }

    @PostMapping("/categories/addNewCategory")
    private boolean addNewCategory(@RequestBody Category category) {
        Category category1 = categoryRepository.findCategoryByCname(category.getCname());
        if (category1 == null) {
            categoryRepository.save(category);
            return true;
        } else {
            return false;
        }
    }

}
