package com.amakakeru.mangaworld.Repository;

import com.amakakeru.mangaworld.Entity.Authorities;
import com.amakakeru.mangaworld.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuthoritiesRepository extends JpaRepository<Authorities, Long> {

//    select a1_0.auth_id,a1_0.type,a1_0.user_id from authorities a1_0 where a1_0.user_id=user.userId
    List<Authorities> findAllByUser(User user);
}
