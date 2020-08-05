/* eslint-disable func-names */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable camelcase */
import { Request, Response } from 'express';

import db from '../database/connection';
import hourToMinutes from '../utils/hoursToMinutes';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

export default class ClassesController {
  async index(request: Request, response: Response) {
    const filters = request.query;

    const week_day = filters.week_day as string;
    const subject = filters.subject as string;
    const time = filters.time as string;

    if (!week_day || !subject || time) {
      return response.status(400).json({
        error: 'Missing filters for search',
      });
    }

    const timeInMinutes = hourToMinutes(filters.time as string);

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')
          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes]);
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }

  async create(request: Request, response: Response) {
    const {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule,
    } = request.body;

    const trans = await db.transaction();

    try {
      const insertedUsersIds = await trans('users').insert({
        name,
        avatar,
        whatsapp,
        bio,
      });

      const userId = insertedUsersIds[0];

      const insertedClassesIds = await trans('classes').insert({
        subject,
        cost,
        user_id: userId,
      });

      const classId = insertedClassesIds[0];

      const classSchedule = schedule.map((item: ScheduleItem) => {
        return {
          class_id: classId,
          week_day: item.week_day,
          from: hourToMinutes(item.from),
          to: hourToMinutes(item.to),
        };
      });

      await trans('classe_schedule').insert(classSchedule);

      await trans.commit();

      return response.status(201).send();
    } catch (error) {
      await trans.rollback();

      return response.status(400).json({
        error: 'Error within the teacher register, try again.',
      });
    }
  }
}
