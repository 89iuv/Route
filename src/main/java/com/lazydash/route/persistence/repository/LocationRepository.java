package com.lazydash.route.persistence.repository;

import com.lazydash.route.persistence.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by VUveges on 10/27/2016.
 */
public interface LocationRepository extends JpaRepository<Location, Long> {
}
