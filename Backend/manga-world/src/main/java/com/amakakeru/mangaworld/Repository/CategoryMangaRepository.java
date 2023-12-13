package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Category;
import com.amakakeru.mangaworld.Entity.CategoryManga;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryMangaRepository extends JpaRepository<CategoryManga, Long> {
    //    @Query("SELECT cm FROM CategoryManga cm WHERE cm.category = ?1")
    List<CategoryManga> findCategoryMangaByCategory(Category category, Pageable pageable);

    //    @Query("SELECT cm FROM CategoryManga cm WHERE cm.category = ?1")
    List<CategoryManga> findCategoryMangaCountByCategory(Category category);
}
