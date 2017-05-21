package com.lazydash.route.persistence.repository;

import com.lazydash.route.persistence.model.Driver;
import org.springframework.data.repository.PagingAndSortingRepository;

/**
 * Created by VUveges on 10/27/2016.
 */
public interface DriverRepository extends PagingAndSortingRepository<Driver, Long> {
}
