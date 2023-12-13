package com.amakakeru.mangaworld.Controller;

import com.amakakeru.mangaworld.Entity.CategoryManga;
import com.amakakeru.mangaworld.Repository.CategoryMangaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin("http://localhost:3000")
@RestController
public class CategoryMangaController {
    @Autowired
    private CategoryMangaRepository categoryMangaRepository;

    @PostMapping("/categoryMangas/addCategoryManga")
    public CategoryManga addAuthorManga(@RequestBody CategoryManga categoryManga) {
        return categoryMangaRepository.save(categoryManga);
    }
}
