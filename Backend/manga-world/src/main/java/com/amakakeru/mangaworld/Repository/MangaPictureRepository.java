package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Manga;
import com.amakakeru.mangaworld.Entity.MangaPicture;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MangaPictureRepository extends JpaRepository<MangaPicture, Long> {
//    select m1_0.mp_id,m1_0.m_id,m1_0.mp_picture from manga_picture m1_0 where m1_0.m_id=manga.getmId()
    MangaPicture findMangaPictureByManga(Manga manga);
}
