package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Volume;
import com.amakakeru.mangaworld.Entity.VolumeCover;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VolumeCoverRepository extends JpaRepository<VolumeCover, Long> {

    //    @Query("select vc from VolumeCover vc where vc.volume = ?1")
    VolumeCover findVolumeCoverByVolume(Volume volume);
}
