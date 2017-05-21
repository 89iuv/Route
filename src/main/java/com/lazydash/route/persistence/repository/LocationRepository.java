package com.lazydash.route.persistence.repository;

import com.lazydash.route.persistence.model.Location;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by VUveges on 10/27/2016.
 */
public interface LocationRepository extends PagingAndSortingRepository<Location, Long> {

    Page<Location> findByNameIgnoreCaseContaining(String name, Pageable pageable);

    Page<Location> findByDeliveryPointIgnoreCaseContaining(String deliveryPoint, Pageable pageable);

    Page<Location> findByGpsIgnoreCaseContaining(String gps, Pageable pageable);

}
