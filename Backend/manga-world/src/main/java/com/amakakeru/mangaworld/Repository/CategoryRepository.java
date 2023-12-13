package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    //    @Query("SELECT c FROM Category c WHERE c.cname = ?1")
    Category findCategoryByCname(String string);
}
